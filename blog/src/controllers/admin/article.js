import { BadRequestError, NotFoundError } from '../../utils/errors'
import Article from '../../models/article'

class ArticleController {
  async list (req, res) {
    const articles = await Article.findAll()

    res.render('admin/article/list', {
      title: 'Articles list',
      articles
    })
  }

  async get (req, res) {
    const { id } = req.params

    const article = await Article.find(+id)

    console.log(article)

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

  async edit (req, res) {
    const { id } = req.params

    const article = await Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    res.render('admin/article/edit', { title: 'Edit article', article })
  }

  async update (req, res) {
    const { id } = req.params

    const { title, text } = req.body

    if (!title || !text) {
      throw new BadRequestError('title and text are required')
    }

    const article = await Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    article.title = title
    article.text = text

    await article.save()

    res.redirect('/admin/article')
  }

  async remove (req, res) {
    const { id } = req.params

    const article = await Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    // await Article.remove(+id)
    await article.remove()

    res.redirect('/admin/article')
  }
}

export default new ArticleController()
