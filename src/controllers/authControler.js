import { StatusCodes } from 'http-status-codes'
import ApiSuccess from '../utils/ApiSuccess.js'
import { register, login, logout } from '~/services/authService.js'
import ApiError from '../utils/ApiError.js'


const registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await register(username, password)
        ApiSuccess(res, user, "User created successfully", StatusCodes.CREATED)
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await login(username, password)
        ApiSuccess(res, user, "Login successfully", StatusCodes.OK)
    } catch (error) {
        next(error)
    }
}

const logoutUser = async (req, res, next) => {
    try {
        // Lấy token từ header
        const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header
        // if (!token) {
        //     throw new ApiError(StatusCodes.BAD_REQUEST, "Token is required");
        // }

        // Thêm token vào blacklist
        await logout(token);
        ApiSuccess(res, null, "Logout successfully", StatusCodes.OK)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    registerUser, loginUser, logoutUser
}