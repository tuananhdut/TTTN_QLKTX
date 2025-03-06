import ApiError from "~/utils/ApiError";
import db from "../models/index";
import { StatusCodes } from "http-status-codes";
import { where } from "sequelize";

export const getRoomById = async (id) => {
    return await db.Room.findByPk(id); // Nếu dùng Sequelize ORM
};


export const getAll = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { rows, count } = await db.Room.findAndCountAll({
            limit: limit,
            offset: offset
        });

        return { rows, count };
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error retrieving users: " + error.message);
    }
}

export const uploadFileImage = async (file, id) => {
    try {
        const filename = uploadImage(file)

        if (filename != null) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Upload fail")
        }

        result = await db.Room.update(
            { image: filename },
            { where: id }
        )
    } catch (error) {

    }



}