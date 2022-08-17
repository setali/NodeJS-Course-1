export function home (req, res) {
  res.render('index', {
    title: 'Home Page',
    message: 'This is homepage'
  })
}

export function about (req, res) {
  res.render('index', {
    title: 'About us',
    message: 'This is About page'
  })
}

export function contact (req, res) {
  res.render('index', {
    title: 'Contact us',
    message: 'This is Contact page'
  })
}
