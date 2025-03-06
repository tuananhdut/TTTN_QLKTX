import ApiError from "~/utils/ApiError";
import db from "../models/index";
import { StatusCodes } from "http-status-codes";
import { uploadImage } from "../utils/uploadImageUtil";
import user from "~/models/user";

exports.createRoomService = async (file, data) => {
    // check room is required
    const room = await db.Room.findOne({
        where: { name: data.name }
    });
    if (room) throw new ApiError(StatusCodes.NOT_FOUND, "Room name is required");

    let filename = null
    // upload image filebase
    if (file) {
        filename = await uploadImage(file)
    }
    const newRoom = await db.Room.create({
        ...data,
        image: filename,
    });
    return newRoom
}

exports.getRoomById = async (id) => {
    const user = await db.Room.findByPk(id)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "Room not found")
    return user
};


exports.getAll = async (page, limit) => {
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



