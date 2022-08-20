import express from 'express'
import ArticleController from '../../controllers/admin/article'

const router = express.Router()

router.get('/', ArticleController.list)
// router.get('/:id([0-9]+)', ArticleController.get)
router.get('/:id(\\d+)', ArticleController.get)
router.post('/', ArticleController.add)
router.put('/:id([0-9]+)', ArticleController.update)

router.get('/create', ArticleController.create)
router.get('/:id([0-9]+)/edit', ArticleController.edit)



// RESTFUL API
// /article     GET
// /article/id  GET
// /article     POST
// /article/id  PUT
// /article/id  DELETE



export default router
