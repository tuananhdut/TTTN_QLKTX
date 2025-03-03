import { StatusCodes } from "http-status-codes";
const ApiSuccess = (res, data = null, message = "Success", statusCode = StatusCodes.ACCEPTED) => {
    return res.status(statusCode).json({
        status: "success",
        message,
        data
    });
};

export default ApiSuccess;