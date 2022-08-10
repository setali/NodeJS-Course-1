console.log(process.pid)
console.log('Parent id:', process.ppid)
process.title = 'Node - Child'

const intervalId = setInterval(() => {
  console.log(Date.now())
}, 1000)

setTimeout(() => {
  //   throw new Error('My error')
  //   clearInterval(intervalId)
  process.exit(2)
}, 5000)
