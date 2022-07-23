// const buf = Buffer.alloc(10, 'ali')

// console.log(buf)

// console.log(typeof buf) // object
// console.log(Array.isArray(buf)) // false

// console.log(buf[0])
// console.log(buf[1])
// console.log(buf[2])
// console.log(buf[10])

// console.log(buf.toString())

// const buf2 = Buffer.allocUnsafe(10)

// console.log(buf2)

// const buf3 = Buffer.from('Ali Mousavi')
// console.log(buf3)
// console.log(buf3.length)

// const buf4 = Buffer.from(buf3)
// console.log(buf4)
// console.log(buf4.toString())

// const buf5 = Buffer.from([97, 98, 99])
// console.log(buf5)
// console.log(buf5.toString())

const buf6 = Buffer.from('علی موسوی')
console.log(buf6)
console.log(buf6.length)
console.log(buf6.toString())
