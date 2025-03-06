const { StatusCodes } = require("http-status-codes");
const s3 = require("../config/filebase");
const ApiError = require("../utils/ApiError");

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