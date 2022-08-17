import path from 'path'

export function home (req, res) {
  const filePath = path.resolve(__dirname, '..', 'views', 'index.html')
  res.sendFile(filePath)
}

export function about (req, res) {
  res.send('About page')
}

export function contact (req, res) {
  res.send('Contact page')
}
