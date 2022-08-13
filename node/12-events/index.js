const myEvent = require('./my-event')
require('./event-handler')

setTimeout(() => {
  myEvent.emit('pow', 4, 5)
}, 2000)

setTimeout(() => {
  myEvent.emit('mul', 2, 3, 4)
}, 4000)
