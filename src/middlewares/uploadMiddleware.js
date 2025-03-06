const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const ApiError = require("~/utils/ApiError");

// Lưu file vào bộ nhớ (buffer) thay vì ổ cứng
const storage = multer.memoryStorage();

// Chỉ chấp nhận ảnh (jpeg, png, jpg)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new ApiError(StatusCodes.UNSUPPORTED_MEDIA_TYPE, "Only image files are allowed!"), false);
    }
};

// Giới hạn dung lượng file (5MB)
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
