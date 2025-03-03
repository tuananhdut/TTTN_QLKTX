import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

// Schema chung cho user (dùng cho cả login và update)
const userSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),

    password: Joi.string().min(6).max(30).messages({
        "string.base": "Password must be a string",
        "string.min": "Password must have at least {#limit} characters",
        "string.max": "Password must have at most {#limit} characters",
    }),

    fullname: Joi.string().max(100).allow(null, "").messages({
        "string.base": "Fullname must be a string",
        "string.max": "Fullname must have at most {#limit} characters",
    }),

    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .allow(null, "")
        .messages({
            "string.base": "Phone number must be a string",
            "string.pattern.base": "Phone number must contain 10-15 digits",
        }),

    birthdate: Joi.date().iso().allow(null, "").messages({
        "date.base": "Birthdate must be a valid date",
        "date.format": "Birthdate must be in ISO format (YYYY-MM-DD)",
    }),

    role: Joi.string().valid("user", "admin").messages({
        "string.base": "Role must be a string",
        "any.only": "Role must be either 'user' or 'admin'",
    }),

    citizen_id: Joi.string()
        .pattern(/^[0-9]{12}$/)
        .allow(null, "")
        .messages({
            "string.base": "Citizen ID must be a string",
            "string.pattern.base": "Citizen ID must contain exactly 12 digits",
        }),

    class: Joi.string().max(50).allow(null, "").messages({
        "string.base": "Class must be a string",
        "string.max": "Class must have at most {#limit} characters",
    }),

    avatar: Joi.string().allow(null, "").messages({
        "string.base": "Avatar must be a string",
    }),
});

/**
 * Middleware validate khi đăng nhập (chỉ cần email và password)
 */
export const validateLogin = async (req, res, next) => {
    try {
        await userSchema
            .fork(["fullname", "phone", "birthdate", "role", "citizen_id", "class", "avatar"], (schema) =>
                schema.forbidden()
            ) // Loại bỏ các field không cần thiết cho login
            .validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
    }
};

/**
 * Middleware validate khi cập nhật user (Không bắt buộc password)
 */
export const validateUpdateUser = async (req, res, next) => {
    try {
        await userSchema
            .fork(["password"], (schema) => schema.forbidden()) // Không cho phép cập nhật password
            .validateAsync(req.body, { abortEarly: false, allowUnknown: false });

        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
    }
};
