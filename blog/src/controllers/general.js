export function home (req, res) {
  // const filePath = path.resolve(__dirname, '..', 'views', 'index.html')

  // const file = fs.readFileSync(filePath, 'utf-8')

  // const view = file
  //   .replace('#title#', 'Home page')
  //   .replace('#message#', 'This is homepage')

  res.renderTemplate('index', {
    title: 'Home Page',
    message: 'This is homepage'
  })
}

export function about (req, res) {
  res.renderTemplate('index', {
    title: 'About us',
    message: 'This is About page'
  })
}

export function contact (req, res) {
  res.renderTemplate('index', {
    title: 'Contact us',
    message: 'This is Contact page'
  })
}
