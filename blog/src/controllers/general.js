import Article from '../models/article'

export async function home (req, res) {
  const articles = await Article.findAll()

  res.render('index', {
    title: 'Home Page',
    articles,
    user: req.user
  })
}

export function about (req, res) {
  res.render('about', {
    title: 'About us',
    user: req.user
  })
}

export function contact (req, res) {
  res.render('contact', {
    title: 'Contact us',
    user: req.user
  })
}
