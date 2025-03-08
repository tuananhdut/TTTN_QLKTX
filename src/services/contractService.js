import ApiError from "~/utils/ApiError.js";
import db, { sequelize } from "../models/index.js";
import { StatusCodes } from "http-status-codes";
import ImageService from './imageService.js'
import RoomService from './roomService.js'
import { Op } from "sequelize"
import { env } from "../config/environment.js"
import { hashPassword } from "../utils/passwordUtil.js"

exports.createContract = async (start_date, end_date, room_id, users) => {
    let people_count = users.length
    const contract_type = (people_count === 1) ? "monthly" : "quarterly";

    // kiểm tra room có tồn tại không 
    const room = await RoomService.getRoomById(room_id);
    if (!room) throw new ApiError(StatusCodes.NOT_FOUND, "Room not found");

    // kiểm tra room còn trống chỗ không
    if (room.status !== "not_filled" || people_count > (room.capacity - room.current_people_count)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Room does not have enough capacity.");
    }

    // kiểm tra tài khoản đã tồn tại chưa
    const emails = users.map(user => user.email);
    const existingUsers = await db.User.findAll({
        where: {
            email: { [Op.in]: emails }
        }
    });
    const existingEmails = new Set(existingUsers.map(user => user.email));
    const newUsers = await Promise.all(
        users
            .filter(user => !existingEmails.has(user.email))
            .map(async user => ({
                ...user,
                password: await hashPassword(env.PASSWORD_DEFAULT)
            }))
    );

    // tạo mới contract
    const transaction = await db.sequelize.transaction();
    try {
        // tạo mới contract
        const newContract = await db.Contract.create({
            start_date,
            end_date,
            people_count,
            room_id,
            contract_type,
            status: "active",
        }, { transaction });

        // tạo mới các user chưa tồn tại
        let createUsers
        try {
            createUsers = await db.User.bulkCreate(newUsers, { transaction });
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new ApiError(StatusCodes.CONFLICT, "A user with this email, phone, or citizen_id already exists.");
            }
            throw error;
        }

        // liên kết các user với với contract
        const allUserInContract = [...existingUsers, ...createUsers]

        const userContracts = allUserInContract.map(user => ({
            user_id: user.id,
            contract_id: newContract.id,
        }));

        try {
            await db.UserContract.bulkCreate(userContracts, { transaction });
        } catch (err) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "check")
        }


        await transaction.commit();
        return newContract

    } catch (error) {
        await transaction.rollback();
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error creating contract: " + error.message);
    }
};