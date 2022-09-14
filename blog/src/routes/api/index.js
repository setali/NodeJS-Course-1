import express from 'express'
import admin from './admin'
import authController from '../../controllers/apiAuth'
import { validate } from 'express-jsonschema'
import { loginSchema as schema } from '../../validators/login'
import fileController from '../../controllers/admin/file'
import uploader from '../../middleware/uploader'

const router = express.Router()

router.use('/admin', admin)
router.post(
  '/login',
  validate(schema),
  authController.login.bind(authController)
)

router.post('/upload', uploader.single('image'), fileController.upload)

export default router
