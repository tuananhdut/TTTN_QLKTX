import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import { hashPassword, comparePassword } from '../utils/passwordUtil.js'
import db from "../models/index";
import jwt from 'jsonwebtoken'
import { env } from '../config/environment.js';
import clientRedis from '../config/redis.js'

const generrateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES })
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

export const register = async (username, password) => {
    // check if user already exists
    const user = await db.User.findOne({ where: { username: username } })
    if (user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User already exists")
    }
    // hash password
    const hashPass = await hashPassword(password)

    // create new user
    const newUser = await db.User.create({
        username: username,
        password: hashPass,
    })
    return { id: newUser.id, username: newUser.username, role: newUser.role }
}

export const login = async (username, password) => {
    console.log("Jwt", env.JWT_SECRET)
    // check if user exists
    const user = await db.User.findOne({ where: { username: username } })
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found")
    }

    // check if password is correct
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect")
    }

    // generate token
    const token = generrateToken(user)

    return {
        user: { id: user.id, username: user.username },
        token: { accessToken: token, expiresIn: env.JWT_EXPIRES }
    }
}

export const logout = async (token) => {
    // Thêm token vào blacklist
    await clientRedis.set(`blacklist:${token}`, 'logout', 'EX', 86400)
    return true
}
