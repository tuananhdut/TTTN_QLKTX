import express from "express";
import {
    createElectricityReadingController,
    getAllElectricityReadingsController,
    getElectricityReadingByIdController,
    updateElectricityReadingController,
    deleteElectricityReadingController
} from "../../controllers/electricityReadingController.js";

const router = express.Router();

router.post("/", createElectricityReadingController);

router.get("/", getAllElectricityReadingsController);

router.get("/:id", getElectricityReadingByIdController);

router.put("/:id", updateElectricityReadingController);

router.delete("/:id", deleteElectricityReadingController);

export default router;
