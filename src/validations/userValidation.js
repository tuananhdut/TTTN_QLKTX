import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";


export const userValidation = async (req, res, next) => {
    const userSchema = Joi.object({
        username: Joi.string().min(3).max(30).required().messages({
            "string.base": "username must be a string",
            "string.empty": "username is required",
            "string.min": "username must have at least {#limit} characters",
            "string.max": "username must have at most {#limit} characters",
            "any.required": "username is required",
        }),
        password: Joi.string().min(6).max(30).required().messages({
            "string.base": "Password must be a string",
            "string.empty": "Password is required",
            "string.min": "Password must have at least {#limit} characters",
            "string.max": "Password must have at most {#limit} characters",
            "any.required": "Password is required",
        })
    });
    try {
        const { username, password } = req.body;
        await userSchema.validateAsync({ username, password }, { abortEarly: false });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
    }
}

