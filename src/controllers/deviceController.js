import * as DeviceService from "../services/deviceService.js";
import ApiSuccess from "~/utils/ApiSuccess.js";
import { StatusCodes } from "http-status-codes";

export const getAllDevicesController = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const { rows, count } = await DeviceService.getAllDevices(page, limit);

        return ApiSuccess(res, {
            page,
            limit,
            totalRecords: count,
            totalPages: Math.ceil(count / limit),
            data: rows
        }, "Devices retrieved successfully");
    } catch (error) {
        next(error);
    }
};

export const getDeviceByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const device = await DeviceService.getDeviceById(id);
        return ApiSuccess(res, device, "Device retrieved successfully", StatusCodes.OK);
    } catch (error) {
        next(error);
    }
};

export const createDeviceController = async (req, res, next) => {
    try {
        const device = await DeviceService.createDevice(req.body);
        return ApiSuccess(res, device, "Device created successfully", StatusCodes.OK);
    } catch (error) {
        next(error);
    }
};

export const updateDeviceController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedDevice = await DeviceService.updateDevice(id, req.body);
        return ApiSuccess(res, updatedDevice, "Device updated successfully", StatusCodes.OK);
    } catch (error) {
        next(error);
    }
};


export const deleteDeviceController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await DeviceService.deleteDevice(id);
        return ApiSuccess(res, result, "Device deleted successfully", StatusCodes.OK);
    } catch (error) {
        next(error); // Controller sẽ truyền lỗi xuống middleware xử lý lỗi chung
    }
};
