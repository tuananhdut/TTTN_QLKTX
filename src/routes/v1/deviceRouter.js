import express from "express";
import {
    getAllDevicesController,
    createDeviceController,
    getDeviceByIdController,
    updateDeviceController,
    deleteDeviceController,
} from "../../controllers/deviceController.js";
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'

const router = express.Router();

router.post("/", authMiddleware, authorize(["admin"]), createDeviceController);
router.get("/",  getAllDevicesController);
router.get("/:id", getDeviceByIdController);
router.put("/:id",  authMiddleware, authorize(["admin"]), updateDeviceController);
router.delete("/:id",  authMiddleware, authorize(["admin"]),deleteDeviceController);

export default router;
