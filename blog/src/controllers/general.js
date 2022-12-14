import Article from '../models/article'

export async function home (req, res) {
  const articles = await Article.findAll({ limit: 4, order: [['id', 'desc']] })

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


export function chat (req, res) {
  res.render('chat', {
    title: 'Chatroom',
    user: req.user
  })
}
