import express from 'express'
import general from './general'
import article from './article'
import admin from './admin'
import { NotFoundError } from '../utils/errors'

const router = express.Router()

router.use('/', general)
router.use('/article', article)
router.use('/admin', admin)

router.all('*', (req, res) => {
  throw new NotFoundError()
})

export default router
