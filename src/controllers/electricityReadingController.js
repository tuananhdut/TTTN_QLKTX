import {
    createElectricityReading,
    getAllElectricityReadings,
    getElectricityReadingById,
    updateElectricityReading,
    deleteElectricityReading
} from "../services/electricityReadingService.js";

import ApiSuccess from "~/utils/ApiSuccess.js";
import ApiError from "~/utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

// Lấy danh sách chỉ số điện (có phân trang)
export const getAllElectricityReadingsController = async (req, res, next) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        const { rows, count } = await getAllElectricityReadings(page, limit);

        return ApiSuccess(res, {
            page,
            limit,
            totalRecords: count,
            totalPages: Math.ceil(count / limit),
            data: rows
        }, "Electricity readings retrieved successfully");
    } catch (error) {
        next(error);
    }
};

// Lấy chỉ số điện theo ID
export const getElectricityReadingByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const electricityReading = await getElectricityReadingById(id);
        if (!electricityReading) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Electricity reading not found");
        }
        return ApiSuccess(res, electricityReading, "Electricity reading retrieved successfully");
    } catch (error) {
        next(error);
    }
};
// Tạo chỉ số điện mới
export const createElectricityReadingController = async (req, res, next) => {
    try {
        const { previous_reading, current_reading, record_month, unit_price, room_id } = req.body;

        if (!previous_reading || !current_reading || !record_month || !unit_price || !room_id) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
        }

        const electricityReading = await createElectricityReading({
            previous_reading,
            current_reading,
            record_month,
            unit_price,
            room_id
        });

        return ApiSuccess(res, electricityReading, "Electricity reading created successfully", StatusCodes.CREATED);
    } catch (error) {
        next(error);
    }
};


// Cập nhật chỉ số điện
export const updateElectricityReadingController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const updatedReading = await updateElectricityReading(id, updatedData);
        return ApiSuccess(res, updatedReading, "Electricity reading updated successfully");
    } catch (error) {
        next(error);
    }
};

// Xóa chỉ số điện
export const deleteElectricityReadingController = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteElectricityReading(id);
        return ApiSuccess(res, null, "Electricity reading deleted successfully", StatusCodes.NO_CONTENT);
    } catch (error) {
        next(error);
    }
};
