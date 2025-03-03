import { StatusCodes } from "http-status-codes";
import { getAll, getById, updateById, deleteById } from "~/services/userService";
import ApiSuccess from "~/utils/ApiSuccess";
import ApiError from "~/utils/ApiError";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAll();
        ApiSuccess(res, users, "Users retrieved successfully");
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await getById(req.params.id);
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