import RoomService from '../services/roomService'
import ApiError from '~/utils/ApiError';
import ApiSuccess from '~/utils/ApiSuccess';
import { StatusCodes } from 'http-status-codes';
import { getImage } from '../utils/getImageUtil'
import ImageService from '../services/imageService'
import ContractService from '../services/contractService'

exports.createContract = async (req, res, next) => {
    try {
        const { start_date, end_date, room_id } = req.body;
        const users = req.body.users
        // Kiểm tra các trường bắt buộc
        if (!start_date || !end_date || !room_id) throw new ApiError(StatusCodes.BAD_REQUEST, "start_date, end_date, and room_id are required")

        // kiểm tra users có dữ liệu không
        if (!users || !Array.isArray(users) || users.length === 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user list.");
        }

        //kiểm tra trùng lặp trong request
        const seen = {
            email: new Set(),
            phone: new Set(),
            citizen_id: new Set(),
        };

        for (const user of users) {
            for (const field of ["email", "phone", "citizen_id"]) {
                if (seen[field].has(user[field])) {
                    throw new Error(`Trùng lặp dữ liệu trong request: ${field} - ${user[field]}`);
                }
                seen[field].add(user[field]);
            }
        }

        const newContract = await ContractService.createContract(start_date, end_date, room_id, users)
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
