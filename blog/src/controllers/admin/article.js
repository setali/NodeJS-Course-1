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
    console.log(req.body)
    res.send('salam')
  }
}

export default new ArticleController()
