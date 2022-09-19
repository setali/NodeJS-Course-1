import express from 'express'
import PersonController from '../../controllers/person'
import acl from '../../middleware/acl'

const router = express.Router()

router.get('/', acl('USER'), PersonController.list)

export default router
