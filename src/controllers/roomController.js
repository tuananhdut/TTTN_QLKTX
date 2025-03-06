// import { StatusCodes } from 'http-status-codes'
// import ApiSuccess from '../utils/ApiSuccess.js'
// import ApiError from "~/utils/ApiError";
// import {create} from "~/services/roomService"


// export const createRoom = async (req, res, next) => {
//     try {
//         // Gọi service để tạo phòng
//         const room = await create(req.body);

//         // Trả về response thành công
//         return ApiSuccess(res, room, "Tạo phòng thành công", StatusCodes.CREATED);
//     } catch (error) {
//         next(error); // Chuyển lỗi vào middleware xử lý lỗi
//     }
// };