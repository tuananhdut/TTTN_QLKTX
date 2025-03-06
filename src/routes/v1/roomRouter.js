import express from 'express'
import { getRoomByIDRoom, getAllRooms } from '../../controllers/roomController'
import { uploadImage } from '../../utils/uploadImageUtil'
import { getImage } from '~/utils/getImageUtil'
import multer from 'multer'
import upload from '~/middlewares/uploadMiddleware'

const router = express.Router()

router.get('/:filename', getImage)

// router.get('/:id', getRoomByIDRoom)

// router.get('/', getAllRooms)

router.post('/upload', upload.single("file"), uploadImage)


export default router