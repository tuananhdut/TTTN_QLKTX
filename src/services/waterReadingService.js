import db from "../models/index.js";
import ApiError from "~/utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

export const getAllWaterReadings = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        console.log("Querying water readings...");

        // Truy vấn danh sách chỉ số nước + thông tin phòng
        const { rows, count } = await db.WaterReading.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: db.Room,
                    as: "room", // alias đặt trong model
                    attributes: ["id", "name"] // Chỉ lấy ID và tên phòng
                }
            ],
            order: [["record_month", "DESC"]] // Sắp xếp theo tháng mới nhất
        });

        return { rows, count };
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error retrieving water readings: " + error.message);
    }
};

export const getWaterReadingById = async (id) => {
    try {
        const waterReading = await db.WaterReading.findByPk(id, {
            include: [
                {
                    model: db.Room,
                    as: "room",
                    attributes: ["id", "name"]
                }
            ]
        });
        if (!waterReading) throw new ApiError(StatusCodes.NOT_FOUND, "Water reading not found");
        return waterReading;
    } catch (error) {
        throw error;
    }
};

export const createWaterReading = async (data) => {
    try {
        const waterReading = await db.WaterReading.create(data);
        return waterReading;
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Error creating water reading: " + error.message);
    }
};

export const updateWaterReading = async (id, data) => {
    try {
        const waterReading = await db.WaterReading.findByPk(id);
        if (!waterReading) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Water reading not found");
        }

        await waterReading.update(data);
        return waterReading;
    } catch (error) {
        throw error;
    }
};

export const deleteWaterReading = async (id) => {
    try {
        const waterReading = await db.WaterReading.findByPk(id);
        if (!waterReading) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Water reading not found");
        }

        await waterReading.destroy();
        return true;
    } catch (error) {
        throw error;
    }
};