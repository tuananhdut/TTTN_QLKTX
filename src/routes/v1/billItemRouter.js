import express from 'express'
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'
import { validateLogin, validateUpdateUser } from '~/validations/userValidation'

const router = express.Router()

router.get('/logout') // done


export default router