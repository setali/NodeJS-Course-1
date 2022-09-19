import express from 'express'
import { home, about, contact, chat } from '../controllers/general'
import acl from '../middleware/acl'

const router = express.Router()

router.get('/', home)
router.get('/about', about)
router.get('/contact', contact)
router.get('/chat', acl('USER'), chat)

export default router
