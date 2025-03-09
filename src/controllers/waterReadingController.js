import { getAllWaterReadings, 
        getWaterReadingById,
        createWaterReading,
        updateWaterReading,
        deleteWaterReading
     } from "../services/waterReadingService.js";
import ApiSuccess from "~/utils/ApiSuccess.js";
import ApiError from '~/utils/ApiError';

export const getAllWaterReadingsController = async (req, res, next) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        const { rows, count } = await getAllWaterReadings(page, limit);

        return ApiSuccess(res, { 
            page, 
            limit, 
            totalRecords: count, 
            totalPages: Math.ceil(count / limit), 
            data: rows 
        }, "Water readings retrieved successfully");
    } catch (error) {
        next(error);
    }
};

export const getWaterReadingByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const waterReading = await getWaterReadingById(id);
        return ApiSuccess(res, waterReading, "Water reading retrieved successfully");
    } catch (error) {
        next(error);
    }
};

export const createWaterReadingController = async (req, res, next) => {
    try {
        const waterReading = await createWaterReading(req.body);
        return ApiSuccess(res, waterReading, "Water reading created successfully");
    } catch (error) {
        next(error);
    }
};

export const updateWaterReadingController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedWaterReading = await updateWaterReading(id, req.body);
        return ApiSuccess(res, updatedWaterReading, "Water reading updated successfully");
    } catch (error) {
        next(error);
    }
};

export const deleteWaterReadingController = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteWaterReading(id);
        return ApiSuccess(res, true, "Water reading deleted successfully");
    } catch (error) {
        next(error);
    }
};

