const s3 = require("../config/filebase");

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("No file uploaded");

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `images/${req.file.originalname}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
            // ACL: "public-read"
        };

        const uploadResult = await s3.upload(params).promise();
        res.json({ url: uploadResult.Location });
    } catch (error) {
        res.status(500).send(error.message);
    }
};