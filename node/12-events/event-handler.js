const myEvent = require('./my-event')

myEvent.on('pow', (a, b) => {
  console.log('Power', a ** b)
})

myEvent.on('mul', (...args) => {
  console.log(
    'Mul',
    args.reduce((acc, el) => acc * el)
  )
})
