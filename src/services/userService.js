import ApiError from "~/utils/ApiError.js";
import db from "../models/index.js";
import { StatusCodes } from "http-status-codes";

const getAll = async () => {
    try {
        const users = await db.User.findAll({
            attributes: ["id", "username"]
        });
        return users;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error retrieving users: " + error.message);
    }
}

const getById = async (id) => {
    try {
        const user = await db.User.findByPk(
            id, {
            attributes: ["id", "username"]
        });
        return user;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error retrieving user: " + error.message);
    }
}

const updateById = async (id, data) => {
    try {
        const user = await db.User.findByPk(id);
        if (!user) {
            console.log("User not found")
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
        }
        await user.update(data)
        return user;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error updating user: " + error.message);
    }
}

const deleteById = async (id) => {
    try {
        const user = await db.User.findByPk(id);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
        }
        await user.destroy();
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAll, getById, updateById, deleteById };