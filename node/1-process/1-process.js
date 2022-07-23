// UV_THREADPOOL_SIZE // default is 4

console.log(process.pid)
console.log(process.ppid)

// console.log(process.config)
console.log(process.env.USER)
console.log(process.uptime())

console.log(process.cpuUsage())
console.log(process.resourceUsage())
console.log(process.memoryUsage())

// process.setUncaughtExceptionCaptureCallback(ex => {
//   console.log('Callback', ex)
//   // throw exe
// })

process.on('uncaughtException', ex => {
  console.log('Event 1', ex)
})

process.on('uncaughtException', ex => {
  console.log('Event 2', ex)
})

console.log(process.hasUncaughtExceptionCaptureCallback())

throw 'Error'

// console.log('Ali')

// setTimeout(() => {
//   console.log(process.uptime())
// }, 2000)

// setInterval(() => {
//   console.log(Date.now())
// }, 10000)

// setTimeout(() => {
//   process.exit()
//   process.kill()
// }, 5000)
