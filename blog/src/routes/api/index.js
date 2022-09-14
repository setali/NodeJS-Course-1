import express from 'express'
import admin from './admin'
import authController from '../../controllers/apiAuth'
import { validate } from 'express-jsonschema'
import { loginSchema as schema } from '../../validators/login'

const router = express.Router()

router.use('/admin', admin)
router.post(
  '/login',
  validate(schema),
  authController.login.bind(authController)
)

export default router
