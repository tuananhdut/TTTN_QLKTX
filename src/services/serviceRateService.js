import db from "../models/index.js";

/**
 * Lấy danh sách ServiceRate theo loại dịch vụ, chỉ lấy dữ liệu mới nhất( bắt buộc chỉ có 3 loại service)
 */
// export const getLatestServiceRates = async () => {
//     try {
//         const serviceTypes = ["electricity", "water", "internet"];

//         const latestRates = await Promise.all(
//             serviceTypes.map(async (type) => {
//                 return await db.ServiceRate.findOne({
//                     where: { service_type: type },
//                     order: [["effective_date", "DESC"]],
//                     attributes: ["id", "unit_price", "effective_date", "service_type"],
//                 });
//             })
//         );

//         return latestRates.filter(rate => rate !== null); // Loại bỏ null nếu không có dữ liệu
//     } catch (error) {
//         throw new Error("Error fetching latest service rates: " + error.message);
//     }
// };

export const getLatestServiceRates = async () => {
    try {
        const serviceTypes = await db.ServiceRate.findAll({
            attributes: ["service_type"], 
            group: ["service_type"], // Lấy danh sách các loại dịch vụ duy nhất
        });

        const uniqueServiceTypes = serviceTypes.map(service => service.service_type);

        const latestRates = await Promise.all(
            uniqueServiceTypes.map(async (type) => {
                return await db.ServiceRate.findOne({
                    where: { service_type: type },
                    order: [["effective_date", "DESC"]],
                    attributes: ["id", "unit_price", "effective_date", "service_type"],
                });
            })
        );

        return latestRates.filter(rate => rate !== null); // Loại bỏ null nếu không có dữ liệu
    } catch (error) {
        throw new Error("Error fetching latest service rates: " + error.message);
    }
};


export const createServiceRate = async (data) => {
    try {
        const { service_type, unit_price, effective_date } = data;

        if (!service_type || !unit_price || !effective_date) {
            throw new Error("Missing required fields.");
        }

        // // Kiểm tra service_type có hợp lệ không
        // const validTypes = ["electricity", "water", "internet"];
        // if (!validTypes.includes(service_type)) {
        //     throw new Error("Invalid service type.");
        // }

        const newRate = await db.ServiceRate.create({
            service_type,
            unit_price,
            effective_date,
        });

        return newRate;
    } catch (error) {
        throw new Error("Error creating service rate: " + error.message);
    }
};


