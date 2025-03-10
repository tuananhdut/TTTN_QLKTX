import express from "express";
import {
    getAllDevicesController,
    createDeviceController,
    getDeviceByIdController,
    updateDeviceController,
    deleteDeviceController,
} from "../../controllers/deviceController.js";

const router = express.Router();

router.post("/", createDeviceController);
router.get("/", getAllDevicesController);
router.get("/:id", getDeviceByIdController);
router.put("/:id", updateDeviceController);
router.delete("/:id", deleteDeviceController);

export default router;
