import Article from '../models/article'

export function home (req, res) {
  const articles = Article.findAll()

  res.render('index', {
    title: 'Home Page',
    articles
  })
}

export function about (req, res) {
  res.render('about', {
    title: 'About us'
  })
}

export function contact (req, res) {
  res.render('contact', {
    title: 'Contact us'
  })
}
