import { StatusCodes } from "http-status-codes";
import UserService from "~/services/userService";
import ApiSuccess from "~/utils/ApiSuccess";
import ApiError from "~/utils/ApiError";

exports.updateAccountAdmin = async (req, res, next) => {
    try {
        const fileImage = req.file
        const data = req.body
        const id = req.params.id
        const user = await UserService.userUpdate(id, fileImage, data);
        ApiSuccess(res, true, "User updated successfully by Admin");
    } catch (error) {
        next(error)
    }
}


exports.createUser = async (req, res, next) => {
    // const data = req.body;
    // const user = await UserService.createUser(data);
    // ApiSuccess(res, null, "Password changed successfully")
}

exports.changePasssUser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Confirmation password does not match")
        }
        const result = await UserService.changePassword(userId, oldPassword, newPassword);
        ApiSuccess(res, null, "Password changed successfully")
    } catch (error) {
        next(error)
    }
}

exports.getAllUsers = async (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 8;
    const { rows, count } = await UserService.getAll(page, limit)
    ApiSuccess(res, { page, limit, totalRecords: count, totalPages: Math.ceil(count / limit), data: rows }, "Users retrieved successfully");
};

exports.getUserByToken = async (req, res, next) => {
    const user = await UserService.getById(req.user.id);
    ApiSuccess(res, user, "User retrieved successfully");
}

exports.updateAccountUser = async (req, res, next) => {
    try {
        const fileImage = req.file
        const data = req.body
        const id = req.user.id
        const user = await UserService.userUpdateProfile(id, fileImage, data);
        ApiSuccess(res, true, "User updated successfully");
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    const user = await UserService.deleteById(req.params.id);
    ApiSuccess(res, null, "User deleted successfully");
}



exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body
    const user = await UserService.login(email, password)
    ApiSuccess(res, user, "Login successfully", StatusCodes.OK)
}

exports.logoutUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header
    if (!token) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Token is required");
    }
    await UserService.logout(token);
    ApiSuccess(res, null, "Logout successfully", StatusCodes.OK)
}

