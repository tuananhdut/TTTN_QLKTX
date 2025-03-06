import RoomService from '../services/roomService'
import ApiError from '~/utils/ApiError';
import ApiSuccess from '~/utils/ApiSuccess';
import { StatusCodes } from 'http-status-codes';
import { getImage } from '../utils/getImageUtil'
import ImageService from '../services/imageService'

exports.updateRoom = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const file = req.file
        const room = await RoomService.updateRoom(id, file, data)
        ApiSuccess(res, true, "Update is success")
    } catch (error) {
        next(error)
    }

}


exports.createRoom = async (req, res, next) => {
    try {
        const file = req.file
        const room = await RoomService.createRoomService(file, req.body)
        ApiSuccess(res, room, "created room success")
    } catch (error) {
        next(error)
    }
}

exports.getRoomByIDRoom = async (req, res, next) => {
    try {
        const id = req.params.id;
        const room = await RoomService.getRoomById(id);
        ApiSuccess(res, room, "Room retrieved successfully", StatusCodes.OK);
    } catch (error) {
        next(error);
    }
};

exports.getAllRooms = async (req, res, next) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 8;
        const { rows, count } = await RoomService.getAll(page, limit)
        ApiSuccess(res, { page, limit, totalRecords: count, totalPages: Math.ceil(count / limit), data: rows }, "Rooms retrieved successfully");
    } catch (error) {
        next(error);
    }
};

exports.getImageRoom = async (req, res, next) => {
    try {
        // console.log(req.params.imageName)
        const filename = req.params.filename
        if (!filename) throw new ApiError(StatusCodes.NOT_FOUND, "filename is required")
        const data = await ImageService.getImage(filename)
        res.setHeader("Content-Type", data.ContentType);
        res.send(data.Body);
    } catch (error) {
        next(error)
    }
}