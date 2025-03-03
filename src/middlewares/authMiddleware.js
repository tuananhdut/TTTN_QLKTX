const { StatusCodes } = require("http-status-codes");
const ApiError = require("~/utils/ApiError");
const jwt = require("jsonwebtoken");
const { env } = require("~/config/environment");
const clientRedis = require("~/config/redis");

export const authMiddleware = async (req, res, next) => {
    try {
        // 1️⃣ Lấy token từ header
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return next(new ApiError(StatusCodes.UNAUTHORIZED, "You do not have permission to access this resource."));
        }

        // 2️⃣ Kiểm tra token có bị thu hồi không
        const isBasicToken = await clientRedis.get(`blacklist:${token}`);
        if (isBasicToken) {
            return next(new ApiError(StatusCodes.UNAUTHORIZED, "Token has been revoked."));
        }

        // 3️⃣ Xác thực token
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded;

        return next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new ApiError(StatusCodes.UNAUTHORIZED, "Token has expired. Please log in again."));
        }
        return next(new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token"));
    }
};
