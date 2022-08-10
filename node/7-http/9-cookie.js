const http = require('http')

http
  .createServer((req, res) => {
    console.log(req.headers.cookie)

    if (req.url === '/') {
      const entries =
        req.headers.cookie?.split(';').map(el => el.trim().split('=')) || []

      const cookies = Object.fromEntries(entries)

      let counter = +cookies.counter || 0

      // res.setHeader('set-cookie', 'counter=0; Max-Age: 3000; httpOnly, secure')
      res.setHeader(
        'set-cookie',
        `counter=${++counter}; Max-Age: 3000; httpOnly`
      )
      res.end('hi')
    }
  })
  .listen(3000, () => console.log('Server is running'))
