import ApiError from "~/utils/ApiError";
import db from "../models/index";
import { StatusCodes } from "http-status-codes";
import { uploadImage } from "../utils/uploadImageUtil";
import user from "~/models/user";
import ImageService from './imageService'

exports.updateRoom = async (id, file, data) => {
    // kiểm tra id có tồn tại ?
    const room = await db.Room.findByPk(id)
    if (!room) throw new ApiError(StatusCodes.NOT_FOUND, "Room not fould")


    // nếu image đã tồn tại nhưng trong req  ko có file nào upload thì dữ nguyên
    // nếu req có thì xóa file cũ và update file mới
    let filename = room.image
    if (file) {
        if (filename) {
            await ImageService.deleteImage(filename)
        }
        filename = await uploadImage(file)
    }

    //kiểm tra name đã tồn tại chưa
    const roomCheckName = await db.Room.findOne({
        where: { name: data.name }
    });
    if (roomCheckName) throw new ApiError(StatusCodes.BAD_REQUEST, "Room name already exists")

    //update
    const updatedRoom = await db.Room.update({
        name: data.name || room.name,
        capacity: data.capacity || room.capacity,
        price: data.price || room.price,
        status: data.status || room.status,
        image: filename, // Cập nhật ảnh nếu có ảnh mới
    },
        {
            where: { id: id }// Điều kiện update
        }
    )
    return updatedRoom
}

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



