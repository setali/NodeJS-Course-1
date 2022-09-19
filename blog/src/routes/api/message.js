import express from 'express'
import MessageController from '../../controllers/message'
import acl from '../../middleware/acl'

const router = express.Router()

router.get('/', acl('USER'), MessageController.list)

export default router
