import { BadRequestError, NotFoundError } from '../../utils/errors'
import Article from '../../models/article'

class ArticleController {
  list (req, res) {
    const articles = Article.findAll()

    res.render('admin/article/list', {
      title: 'Articles list',
      articles
    })
  }

  get (req, res) {
    const { id } = req.params

    const article = Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    res.render('admin/article/show', {
      title: article.title,
      article
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

    const article = new Article({ title, text })

    article.save()

    res.redirect('/admin/article')
  }

  edit (req, res) {
    const { id } = req.params

    const article = Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    res.render('admin/article/edit', { title: 'Edit article', article })
  }

  update (req, res) {
    const { id } = req.params

    const { title, text } = req.body

    if (!title || !text) {
      throw new BadRequestError('title and text are required')
    }

    const article = Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    article.title = title
    article.text = text

    article.save()

    res.redirect('/admin/article')
  }

  remove (req, res) {
    const { id } = req.params

    const article = Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    Article.remove(+id)

    res.redirect('/admin/article')
  }
}

export default new ArticleController()
