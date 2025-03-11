import RoomService from '../services/roomService'
import ApiError from '~/utils/ApiError';
import ApiSuccess from '~/utils/ApiSuccess';
import { StatusCodes } from 'http-status-codes';
import { getImage } from '../utils/getImageUtil'
import MonthlyBillService from '../services/monthlyBillService'

exports.getAllMonthlyBills = async (req, res, next) => {
    try {
        console.log("check")
        const monthlyBills = await MonthlyBillService.getAllMonthlyBills()
        ApiSuccess(res, monthlyBills, "")
    } catch (error) {
        next(error)
    }
}

exports.createMonthlyBill = async (req, res, next) => {
    try {
        const { bill_month, room_id, billItems } = req.body
        const monthlyBill = await MonthlyBillService.createMonthlyBill(bill_month, room_id, billItems)
        ApiSuccess(res, monthlyBill, "")
    } catch (error) {
        next(error)
    }
}
