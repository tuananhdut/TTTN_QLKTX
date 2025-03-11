import express from 'express'
import UserController from '~/controllers/userControler'
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'
import { validateLogin, validateUpdateUser } from '~/validations/userValidation'
import MonthlyBillController from '../../controllers/monthlyBillController'

const router = express.Router()

// lấy tất cả danh sách hóa đơn
router.get('/', MonthlyBillController.getAllMonthlyBills)
router.post('/', MonthlyBillController.createMonthlyBill)


export default router