import ApiError from "~/utils/ApiError.js";
import db from "../models/index.js";
import { StatusCodes } from "http-status-codes";
import ImageService from './imageService.js'
import RoomService from './roomService.js'

exports.createContract = async (start_date, end_date, room_id, people_count) => {
    const contract_type = (people_count === 1) ? "monthly" : "quarterly";

    const room = await RoomService.getRoomById(room_id);
    if (!room) throw new ApiError(StatusCodes.NOT_FOUND, "Room not found");

    if (room.status !== "not_filled" || people_count > (room.capacity - room.current_people_count)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Room does not have enough capacity.");
    }

    // Dùng transaction để đảm bảo dữ liệu luôn nhất quán
    const transaction = await db.sequelize.transaction();
    try {
        const newContract = await db.Contract.create({
            start_date,
            end_date,
            people_count,
            room_id,
            contract_type,
            status: "active",
        }, { transaction });

        await db.Room.update(
            { current_people_count: db.sequelize.literal(`current_people_count + ${people_count}`) },
            { where: { id: room.id }, transaction }
        );

        await transaction.commit();
        return newContract;
    } catch (error) {
        await transaction.rollback();
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error creating contract: " + error.message);
    }
};