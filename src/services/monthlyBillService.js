import db from "../models/index.js";
import ApiError from "~/utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

exports.getAllMonthlyBills = async () => {
    const monthlyBills = await db.MonthlyBill.findAll({
        include: [
            {
                model: db.User,
                as: "student",
                attributes: ["id", "fullname", "email"], // Lấy thông tin sinh viên
            },
            {
                model: db.Room,
                as: "room",
                attributes: ["id", "name"], // Lấy thông tin phòng
            },
            {
                model: db.BillItem,
                as: "billItems",
                attributes: ["id", "service_id", "previous_reading", "current_reading", "price"],
                include: [
                    {
                        model: db.ServiceRate,
                        as: "service",
                        attributes: ["id", "service_type", "unit_price"], // Lấy thông tin dịch vụ
                    },
                ],
            },
        ],
        // order: [["bill_month", "DESC"]], // Sắp xếp theo tháng mới nhất
    });
    return monthlyBills
}

exports.createMonthlyBill = async () => {

}
