import { StatusCodes } from "http-status-codes";
import { getAll, getById, updateById, deleteById, login, logout, changePassword } from "~/services/userService";
import ApiSuccess from "~/utils/ApiSuccess";
import ApiError from "~/utils/ApiError";

export const changePasssUser = async (req, res, next) => {
    try {
        console.log('check')
        const userId = req.user.id;

        const { oldPassword, newPassword, confirmPassword } = req.body;

        const result = await changePassword(userId, oldPassword, newPassword, confirmPassword);
        ApiSuccess(res, null, "Password changed successfully")

    } catch (error) {
        return next(error);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 8;
        const { rows, count } = await getAll(page, limit)
        ApiSuccess(res, { page, limit, totalRecords: count, totalPages: Math.ceil(count / limit), data: rows }, "Users retrieved successfully");
    } catch (error) {
        next(error);
    }
};


export const getUserByToken = async (req, res, next) => {
    try {
        const user = await getById(req.user.id);
        if (!user) {
            return next(new ApiError(StatusCodes.NOT_FOUND, "User not found"));
        }
        ApiSuccess(res, user, "User retrieved successfully");
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await updateById(req.params.id, req.body);
        ApiSuccess(res, user, "User updated successfully");
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await deleteById(req.params.id);
        ApiSuccess(res, null, "User deleted successfully");
    } catch (error) {
        next(error);
    }
}



export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await login(email, password)

        ApiSuccess(res, user, "Login successfully", StatusCodes.OK)
    } catch (error) {
        next(error)
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        // Lấy token từ header
        const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

        if (!token) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Token is required");
        }

        // Thêm token vào blacklist
        await logout(token);
        ApiSuccess(res, null, "Logout successfully", StatusCodes.OK)
    } catch (error) {
        next(error)
    }
}