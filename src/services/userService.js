import ApiError from "~/utils/ApiError.js";
import db from "../models/index.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePassword } from '../utils/passwordUtil.js'
import jwt from 'jsonwebtoken'
import { env } from '../config/environment.js';
import clientRedis from '../config/redis.js'
import ImageService from './imageService.js'

exports.userUpdate = async (id, file, data) => {
    const user = await db.User.findByPk(id)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "user not found")

    let filename = user.avatar
    if (file) {
        if (filename) {
            await ImageService.deleteImage(filename)
        }
        filename = await ImageService.uploadImage(file)
    }

    if (data.phone) {
        const phone = await db.User.findOne({
            where: { phone: data.phone }
        });
        if (phone) throw new ApiError(StatusCodes.BAD_REQUEST, "Phone Number already exists")
    }

    if (data.email) {
        const email = await db.User.findOne({
            where: { email: data.email }
        });
        if (email) throw new ApiError(StatusCodes.BAD_REQUEST, "Email already exists")
    }

    if (data.citizen_id) {
        const citizen_id = await db.User.findOne({
            where: { citizen_id: data.citizen_id }
        });
        if (citizen_id) throw new ApiError(StatusCodes.BAD_REQUEST, "citizen already exists")
    }

    const updatedCount = await db.User.update({
        phone: data.phone || user.phone,
        fullname: data.fullname || user.fullname,
        email: data.email || user.email,
        birthdate: data.birthdate || user.birthdate,
        citizen_id: data.citizen_id || user.citizen_id,
        class: data.class || user.class,
        avatar: filename,
    },
        {
            where: { id: id }
        }
    )

    return updatedCount
}

exports.userUpdateProfile = async (id, file, data) => {
    const user = await db.User.findByPk(id)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "user not found")

    let filename = user.avatar
    if (file) {
        if (filename) {
            await ImageService.deleteImage(filename)
        }
        filename = await ImageService.uploadImage(file)
    }

    if (data.phone) {
        const phone = await db.User.findOne({
            where: { phone: data.phone }
        });
        if (phone) throw new ApiError(StatusCodes.BAD_REQUEST, "Phone Number already exists")
    }

    const updatedCount = await db.User.update({
        phone: data.phone || user.phone,
        fullname: data.fullname || user.fullname,
        avatar: filename,
    },
        {
            where: { id: id }
        }
    )

    return updatedCount
}

exports.createUser = async (data) => {
    // const user = await db.User.create({

    // })
}

exports.changePassword = async (userId, oldPassword, newPassword, confirmPassword) => {
    // Kiểm tra xác nhận mật khẩu mới
    if (newPassword !== confirmPassword) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Confirm password does not match new password");
    }

    // Tìm user trong database
    const user = await db.User.findByPk(userId);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Old password is incorrect");
    }

    // Kiểm tra nếu mật khẩu mới trùng mật khẩu cũ
    if (oldPassword === newPassword) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "New password cannot be the same as old password");
    }

    // Hash mật khẩu mới và cập nhật vào database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return null
};

exports.getAll = async (page, limit) => {
    let offset = (page - 1) * limit;
    const { rows, count } = await db.User.findAndCountAll({
        attributes: { exclude: ['password'] },
        limit: limit,
        offset: offset
    });

    return { rows, count };
}

exports.getById = async (id) => {
    const user = await db.User.findByPk(
        id, {
        attributes: { exclude: ["password"] }
    });
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "User not found")
    return user;
}

exports.updateById = async (id, data) => {
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
}

exports.deleteById = async (id) => {
    const user = await db.User.findByPk(id);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    await user.destroy();
    return user;
}


const generrateToken = (user) => {
    return jwt.sign(user, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES })
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, env.JWT_SECRET)
    } catch (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token");

    }
}

const refeshToken = async (token) => {
    try {
        const user = jwt.verify(token, env.JWT_SECRET)
        return generrateToken(user)
    } catch (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token");
    }
}


exports.login = async (email, password) => {
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

exports.logout = async (token) => {
    // Thêm token vào redis (black list)
    await clientRedis.set(`blacklist:${token}`, 'logout', 'EX', 86400)
    return true
}

exports.getUserData = async (userId) => {
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

