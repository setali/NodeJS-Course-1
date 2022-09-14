import express from 'express'
import ArticleController from '../../../controllers/admin/article'
import acl from '../../../middleware/acl'

const router = express.Router()

router.get('/', acl('WRITER'), ArticleController.list)

router.get('/:id(\\d+)', acl('WRITER'), ArticleController.get)

router.post('/', acl('WRITER'), ArticleController.add)

router.put('/:id([0-9]+)', acl('MODERATOR'), ArticleController.update)

router.delete('/:id([0-9]+)', acl('ADMIN'), ArticleController.remove)

// RESTFUL API
// /article     GET
// /article/id  GET
// /article     POST
// /article/id  PUT
// /article/id  DELETE

export default router
