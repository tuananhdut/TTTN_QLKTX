import db from "../models/index.js";
import ApiError from "~/utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

export const getAllElectricityReadings = async (page, limit ) => {
    try {
        // page = parseInt(page) > 0 ? parseInt(page) : 1;
        // limit = parseInt(limit) > 0 ? parseInt(limit) : 10;
        let offset = (page - 1) * limit;

        console.log(`Fetching water readings... Page: ${page}, Limit: ${limit}`);

        // Lấy danh sách chỉ số điện có phân trang
        const { rows, count } = await db.ElectricityReading.findAndCountAll({
            limit,
            offset,
            attributes: ["id", "previous_reading", "current_reading", "record_month", "unit_price"],
            include: [
                {
                    model: db.Room,
                    as: "room",
                    attributes: ["id", "name"], // Chỉ lấy thông tin cần thiết của phòng
                }
            ],
            order: [["record_month", "DESC"]] // Sắp xếp theo tháng mới nhất
        });

        return { rows, count };
    } catch (error) {
        console.error("Error fetching water readings:", error);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Error retrieving electric readings: ${error.message}`);
    }
};

export const getElectricityReadingById = async (id) => {
    try {
        const electricityReading = await db.ElectricityReading.findByPk(id, {
            include: [{ model: db.Room, as: "room" }]
        });
        return electricityReading;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error retrieving electricity reading: " + error.message);
    }
};

export const createElectricityReading = async (data) => {
    try {
        const room = await db.Room.findByPk(data.room_id);
        if (!room) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Room not found");
        }

        const electricityReading = await db.ElectricityReading.create(data);
        return electricityReading;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error creating electricity reading: " + error.message);
    }
};

export const updateElectricityReading = async (id, updatedData) => {
    try {
        const electricityReading = await db.ElectricityReading.findByPk(id);
        if (!electricityReading) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Electricity reading not found");
        }

        await electricityReading.update(updatedData);
        return electricityReading;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error updating electricity reading: " + error.message);
    }
};

export const deleteElectricityReading = async (id) => {
    try {
        const electricityReading = await db.ElectricityReading.findByPk(id);
        if (!electricityReading) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Electricity reading not found");
        }

        await electricityReading.destroy();
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error deleting electricity reading: " + error.message);
    }
};
