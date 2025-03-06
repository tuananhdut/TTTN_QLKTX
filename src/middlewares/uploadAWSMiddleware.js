const ApiError = require("~/utils/ApiError");
const s3 = require("../config/filebase");
const { StatusCodes } = require("http-status-codes");

exports.uploadImage = async (req, res, next) => {
    try {
        if (!req.file)
            return next(new (ApiError(StatusCodes.BAD_REQUEST, "No file uploaded")))

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `images/${req.file.originalname}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        const uploadResult = await s3.upload(params).promise();
        res.json({ url: uploadResult.Location });
    } catch (error) {
        res.status(500).send(error.message);
    }
};