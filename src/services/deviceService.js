import db from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

export const getAllDevices = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;

        const { rows, count } = await db.Device.findAndCountAll({
            limit,
            offset,
            attributes: ["id", "name", "price", "status", "description", "image"],
            include: [{ model: db.Room, as: "room", attributes: ["id", "name"] }],
            order: [["createdAt", "DESC"]],
        });

        return { rows, count };
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Error retrieving devices: ${error.message}`);
    }
};

export const getDeviceById = async (id) => {
    try {
        const device = await db.Device.findByPk(id, {
            include: [{ model: db.Room, as: "room" }],
        });

        if (!device) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Device not found");
        }

        return device;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Error retrieving device: ${error.message}`);
    }
};

export const createDevice = async (data) => {
    try {
        if (data.room_id) {
            const room = await db.Room.findByPk(data.room_id);
            if (!room) throw new ApiError(StatusCodes.NOT_FOUND, "Room not found");
        }

        return await db.Device.create(data);
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Error creating device: ${error.message}`);
    }
};

export const updateDevice = async (id, updatedData) => {
    try {
        const device = await db.Device.findByPk(id);
        if (!device) throw new ApiError(StatusCodes.NOT_FOUND, "Device not found");

        await device.update(updatedData);
        return device;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Error updating device: ${error.message}`);
    }
};

export const deleteDevice = async (id) => {
    const device = await db.Device.findByPk(id);
    if (!device) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Device not found");
    }

    // Xóa thiết bị nếu tìm thấy
    await device.destroy();
    return { message: "Device deleted successfully" };
};
