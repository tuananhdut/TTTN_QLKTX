import { StatusCodes } from "http-status-codes";
import UserService from "~/services/userService";
import ApiSuccess from "~/utils/ApiSuccess";
import ApiError from "~/utils/ApiError";

exports.createUser = async (req, res, next) => {
    // const data = req.body;
    // const user = await UserService.createUser(data);
    // ApiSuccess(res, null, "Password changed successfully")
}

exports.changePasssUser = async (req, res, next) => {
    const userId = req.user.id;

    const { oldPassword, newPassword, confirmPassword } = req.body;

    const result = await UserService.changePassword(userId, oldPassword, newPassword, confirmPassword);
    ApiSuccess(res, null, "Password changed successfully")
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

exports.updateUser = async (req, res, next) => {
    const user = await UserService.updateById(req.params.id, req.body);
    ApiSuccess(res, user, "User updated successfully");
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

