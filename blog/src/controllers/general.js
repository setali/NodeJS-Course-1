export function home (req, res) {
  res.render('index', {
    title: 'Home Page',
    message: 'This is homepage'
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
