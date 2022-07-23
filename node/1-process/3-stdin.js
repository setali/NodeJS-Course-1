process.stdin.on('data', data => {
  // console.log('My data is', data.toString())
  // console.log(data.toString().toUpperCase())
  process.stdout.write(data.toString().toUpperCase())
  console.log(data)
})
