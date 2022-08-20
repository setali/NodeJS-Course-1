import { BadRequestError } from '../../utils/errors'

const articles = []

class ArticleController {
  list (req, res) {
    res.render('admin/article/list', {
      title: 'Articles list',
      articles: []
    })
  }

  create (req, res) {
    res.render('admin/article/create', {
      title: 'Create article'
    })
  }

  add (req, res) {
    const { title, text } = req.body

    if (!title || !text) {
      throw new BadRequestError('title and text are required')
    }

    articles.push({ id: Date.now(), title, text })

    res.redirect('/admin/article')
  }
}

export default new ArticleController()
