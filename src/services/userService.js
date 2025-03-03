import ApiError from "~/utils/ApiError.js";
import db from "../models/index.js";
import { StatusCodes } from "http-status-codes";
import e from "express";

const getAll = async () => {
    try {
        const users = await db.User.findAll({
            attributes: { exclude: ["password"] }
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
            attributes: { exclude: ["password"] }
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
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
        }

        // Remove password from data
        if ("password" in data) {
            delete data.password;
        }

        // Update user
        const userUpdate = await user.update(data);

        // Remove password from userUpdate
        delete userUpdate.dataValues.password;

        return userUpdate;
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