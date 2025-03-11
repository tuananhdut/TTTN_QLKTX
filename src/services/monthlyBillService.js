import db, { sequelize } from "../models/index.js";
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

exports.createMonthlyBill = async (bill_month, room_id, billItems) => {
    const existingBill = await db.MonthlyBill.findOne({
        where: {
            bill_month,
            room_id
        }
    });

    if (existingBill) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `Bill for room ${room_id} in ${bill_month} already exists!`);
    }
    // kiểm tra room đã tồn tại chưa
    const room = await db.Room.findByPk(room_id);
    if (!room) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Room not found!");
    }

    let total_amount = 0;
    const billDetails = [];
    //check billItems có khác rỗng hay không 


    // kiểm tra các service đã tồn tại chưa
    for (const item of billItems) {
        // Kiểm tra service có tồn tại không
        const serviceRate = await db.ServiceRate.findByPk(item.service_id);
        // console.log(serviceRate)

        if (!serviceRate) {
            throw new ApiError(StatusCodes.BAD_REQUEST, `Service with ID ${item.service_id} not found!`);
        }

        // Tìm tất cả các dịch vụ có cùng tên
        const sameNameServices = await db.ServiceRate.findAll({
            where: { service_type: serviceRate.service_type },
            order: [["effective_date", "DESC"]], // Lấy dịch vụ có ID mới nhất (nếu có nhiều)
        });
        const serviceIds = sameNameServices.map(service => service.id);


        // Lấy số đọc trước đó (nếu có)
        const previousBillItem = await db.BillItem.findOne({
            where: {
                service_id: serviceIds,
            },
            include: [
                {
                    model: db.MonthlyBill,
                    as: "bill",
                    where: { room_id }, // Lọc theo cùng phòng
                },
                {
                    model: db.ServiceRate,
                    as: "service",
                    attributes: ["service_type"],
                },
            ],
            order: [["bill_id", "DESC"]],
        });
        const previous_reading = previousBillItem ? previousBillItem.current_reading : 0;
        const current_reading = item.current_reading;

        if (current_reading < previous_reading) {
            throw new ApiError(StatusCodes.BAD_REQUEST, `Current reading cannot be less than previous reading for service ${item.service_id}`);
        }

        // Tính giá tiền: (current - previous) * đơn giá dịch vụ
        const price = (current_reading - previous_reading) * serviceRate.unit_price;
        total_amount += price;

        // Thêm vào danh sách billItems
        billDetails.push({
            service_id: item.service_id,
            previous_reading,
            current_reading,
            price,
        });
    }
    if (billDetails.length === 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "ko có hóa đơn chi tiết nào")
    }
    // Tạo hóa đơn mới
    const transaction = await db.sequelize.transaction();
    try {
        const monthlyBill = await db.MonthlyBill.create({
            bill_month,
            room_id,
            total_amount,
            payment_status: "pending",
        }, { transaction });
        // Gán bill_id cho từng billItem và lưu vào database
        billDetails.forEach((detail) => (detail.bill_id = monthlyBill.id));
        await db.BillItem.bulkCreate(billDetails, { transaction });

        await transaction.commit();
        return monthlyBill;

    } catch (error) {
        await transaction.rollback();
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error creating bill: " + error.message);
    }
}
