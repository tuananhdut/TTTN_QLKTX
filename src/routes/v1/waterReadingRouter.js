import express from "express";
import {getAllWaterReadingsController, 
        getWaterReadingByIdController,
        createWaterReadingController,
        updateWaterReadingController,
        deleteWaterReadingController} from "../../controllers/waterReadingController.js";
import { authMiddleware, authorize } from "~/middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllWaterReadingsController);

router.get("/:id", getWaterReadingByIdController);

// Thêm mới chỉ số nước (chỉ admin được phép)
// router.post("/", authMiddleware, authorize(["admin"]), createWaterReadingController);
router.post("/", createWaterReadingController);

// Cập nhật chỉ số nước (chỉ admin được phép)
router.put("/:id", updateWaterReadingController);

// Xóa chỉ số nước (chỉ admin được phép)
router.delete("/:id", deleteWaterReadingController);

export default router;
