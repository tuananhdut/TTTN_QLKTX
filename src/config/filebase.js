require("dotenv").config();
const AWS = require("aws-sdk");

// Cấu hình AWS S3 cho Filebase
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: process.env.S3_ENDPOINT, // https://s3.filebase.com
    s3ForcePathStyle: true,
});

module.exports = s3;