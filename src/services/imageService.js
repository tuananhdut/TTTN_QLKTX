const { StatusCodes } = require("http-status-codes");
const s3 = require("../config/filebase");
const ApiError = require("../utils/ApiError");
import path from 'path'

exports.getImage = async (filename) => {
    if (!filename) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Filename not found")
    }

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `images/${filename}`, // Đường dẫn trong S3
    };
    try {
        const data = await s3.getObject(params).promise();
        return data
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to get image");
    }
};

exports.deleteImage = async (filename) => {
    if (!filename) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Filename is required");
    }

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `images/${filename}`, // Đường dẫn đến ảnh trong S3
    };

    try {
        await s3.deleteObject(params).promise();
        return true;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to delete image");
    }
};


const generateRandomString = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};


exports.uploadImage = async (file) => {
    try {
        // Lấy phần mở rộng của file (vd: .jpg, .png)
        const fileExtension = path.extname(file.originalname);

        // Lấy tên file gốc không bao gồm phần mở rộng
        const originalName = path.basename(file.originalname, fileExtension).replace(/\s+/g, "_");

        // Tạo timestamp + random 8 ký tự + original name + extension
        const timestamp = Date.now();
        const randomString = generateRandomString(6);
        const newFileName = `${timestamp}_${randomString}_${originalName}${fileExtension}`;


        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `images/${newFileName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const uploadResult = await s3.upload(params).promise();

        if (!uploadResult || !uploadResult.Location) {
            return null;
        }
        return newFileName
    } catch (error) {
        return error
    }
};