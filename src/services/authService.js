import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import { hashPassword, comparePassword } from '../utils/passwordUtil.js'
import db from "../models/index";
import jwt from 'jsonwebtoken'
import { env } from '../config/environment.js';
import clientRedis from '../config/redis.js'

const generrateToken = (user) => {
    return jwt.sign(user, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES })
}

export const verifyToken = async (token) => {
    try {
        return jwt.verify(token, env.JWT_SECRET)
    } catch (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token");

    }
}

export const refeshToken = async (token) => {
    try {
        const user = jwt.verify(token, env.JWT_SECRET)
        return generrateToken(user)
    } catch (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token");
    }
}


export const login = async (email, password) => {
    console.log("Jwt", env.JWT_SECRET)
    // check if user exists
    const user = await db.User.findOne({
        where: { email: email }
    })
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found")
    }

    // check if password is correct
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect")
    }

    // remove password from user object
    const userData = user.toJSON();
    delete userData.password;

    // generate token
    const token = generrateToken(userData)

    return {
        user: userData,
        token: { accessToken: token, expiresIn: env.JWT_EXPIRES }
    }
}

export const logout = async (token) => {
    // Thêm token vào 
    await clientRedis.set(`blacklist:${token}`, 'logout', 'EX', 86400)
    return true
}

export const getUserData = async (userId) => {
    const user = await db.User.findByPk(userId, {
        attributes: [
            "id", "fullname", "email", "phone", "birthdate",
            "role", "citizen_id", "class", "avatar"
        ],
        raw: true
    });

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    return user;
};
