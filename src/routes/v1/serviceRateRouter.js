import express from "express";
import * as ServiceRateController from "../../controllers/serviceRateController.js";
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'


const router = express.Router();

router.get("/", ServiceRateController.getServiceRatesController);
router.post("/", authMiddleware, authorize(["admin"]), ServiceRateController.createServiceRateController);

export default router;
