import { getRoomById, getAll } from '../services/roomService'
import ApiError from '~/utils/ApiError';
import ApiSuccess from '~/utils/ApiSuccess';
import { StatusCodes } from 'http-status-codes';
import { uploadImage } from '~/middlewares/uploadAWSMiddleware';


export const uploadImageRoom = async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).send("No file uploaded");

        const filename = uploadImage(req.file)

        if ()

            ApiSuccess(res, room, "Room retrieved successfully", StatusCodes.OK);
    } catch (error) {
        next(error);
    }
};

export const getRoomByIDRoom = async (req, res, next) => {
    try {
        const id = req.params.id; // Lấy ID từ URL
        const room = await getRoomById(id); // Gọi service để lấy dữ liệu

        if (!room) {
            return next(new ApiError(StatusCodes.NOT_FOUND, "Room not found"));
        }

        ApiSuccess(res, room, "Room retrieved successfully", StatusCodes.OK);
    } catch (error) {
        next(error);
    }
};
export const getAllRooms = async (req, res, next) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 8;
        const { rows, count } = await getAll(page, limit)
        ApiSuccess(res, { page, limit, totalRecords: count, totalPages: Math.ceil(count / limit), data: rows }, "Rooms retrieved successfully");
    } catch (error) {
        next(error);
    }
};