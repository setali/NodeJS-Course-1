import express from 'express'
import admin from './admin'
import authController from '../../controllers/apiAuth'

const router = express.Router()

router.use('/admin', admin)
router.post('/login', authController.login.bind(authController))

export default router
