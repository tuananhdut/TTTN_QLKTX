import RoomService from '../services/roomService'
import ApiError from '~/utils/ApiError';
import ApiSuccess from '~/utils/ApiSuccess';
import { StatusCodes } from 'http-status-codes';
import { getImage } from '../utils/getImageUtil'
import ImageService from '../services/imageService'
import ContractService from '../services/contractService'

exports.createContract = async (req, res, next) => {
    try {
        const { start_date, end_date, room_id, people_count } = req.body;
        console.log(req.body)

        // Kiểm tra các trường bắt buộc
        if (!start_date || !end_date || !room_id || !people_count) throw new ApiError(StatusCodes.BAD_REQUEST, "start_date, end_date, and room_id are required")
        if (typeof people_count !== "number" || !Number.isInteger(people_count) || people_count < 1) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "people_count must be a positive integer");
        }

        const newContract = await ContractService.createContract(start_date, end_date, room_id, people_count)
        ApiSuccess(res, newContract, "Contract is created successfully");
    } catch (error) {
        next(error)
    }
}


exports.getContractByStatus = async (req, res, next) => {
    // try {
    //     let page = parseInt(req.query.page) || 1;
    //     let limit = parseInt(req.query.limit) || 8;
    //     const { rows, count } = await ContractService.getAll(page, limit)
    //     ApiSuccess(res, { page, limit, totalRecords: count, totalPages: Math.ceil(count / limit), data: rows }, "Rooms retrieved successfully");
    // } catch (error) {
    //     next(error)
    // }
}
