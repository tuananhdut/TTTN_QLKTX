const { StatusCodes } = require("http-status-codes");
const s3 = require("../config/filebase");
const ApiError = require("./ApiError");
import path from 'path'
import ApiSuccess from './ApiSuccess';

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