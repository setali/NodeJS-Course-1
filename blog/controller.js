function home (req, res) {
  res.send('Home Page')
}

function about (req, res) {
  res.send('About page')
}

function contact (req, res) {
  res.send('Contact page')
}

module.exports = {
  home,
  about,
  contact
}
