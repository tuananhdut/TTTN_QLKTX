import { StatusCodes } from 'http-status-codes'
import ApiSuccess from '../utils/ApiSuccess.js'
import { login, logout } from '~/services/authService.js'
import ApiError from '../utils/ApiError.js'

const loginUser = async (req, res, next) => {
    try {
        console.log(req.body)
        const { email, password } = req.body
        const user = await login(email, password)
        ApiSuccess(res, user, "Login successfully", StatusCodes.OK)
    } catch (error) {
        next(error)
    }
}

const logoutUser = async (req, res, next) => {
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


module.exports = {
    loginUser, logoutUser
}