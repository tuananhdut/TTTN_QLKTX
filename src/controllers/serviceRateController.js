import * as ServiceRateService from "../services/serviceRateService.js";
import ApiSuccess from "../utils/ApiSuccess.js";


export const getServiceRatesController = async (req, res, next) => {
    try {
        const rates = await ServiceRateService.getLatestServiceRates();
        return ApiSuccess(res, rates, "Get latest service rates successfully");
    } catch (error) {
        next(error);
    }
};

export const createServiceRateController = async (req, res, next) => {
    try {
        const newRate = await ServiceRateService.createServiceRate(req.body);
        return ApiSuccess(res, newRate, "Service rate created successfully");
    } catch (error) {
        next(error);
    }
};

export const deleteServiceRateByNameController = async (req, res, next) => {
    try {
        const { service_type } = req.params;
        const result = await ServiceRateService.deleteServiceRateByName(service_type); // Gọi service để xóa
        
        return ApiSuccess(res, result, "Service rate deleted successfully", StatusCodes.OK);
    } catch (error) {
        next(error);
    }
};


