const { StatusCodes } = require("http-status-codes");
const s3 = require("../config/filebase");
const ApiError = require("./ApiError");

exports.getImage = async (req, res) => {
    try {
        const filename = req.params.filename;

        if (!filename) {
            return next(new ApiError(StatusCodes.BAD_REQUEST, "Filename not found"))
        }

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `images/${filename}`, // Đường dẫn trong S3
        };

        const data = await s3.getObject(params).promise();

        res.setHeader("Content-Type", data.ContentType); // Đặt kiểu ảnh (image/png, image/jpeg)
        res.send(data.Body); // Trả về ảnh trực tiếp
    } catch (error) {
        res.status(500).send(error.message);
    }
};
