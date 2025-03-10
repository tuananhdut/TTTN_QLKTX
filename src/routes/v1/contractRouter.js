import express from 'express'
import upload from '~/middlewares/uploadMiddleware'
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'
import ContractControlle from '../../controllers/contractController'

const router = express.Router()

router.get('/:idContract/users', ContractControlle.getUsersByContracId)

router.post('/', authMiddleware, authorize(["admin"]), ContractControlle.createContract)

// router.put('/:id',ContractControlle.updateContract)

// router.put('/:id',ContractControlle.deleteContract)


export default router