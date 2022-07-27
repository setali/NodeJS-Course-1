const buf = Buffer.from('AliMousavi')

console.log(buf)
console.log(buf.toString())

const buf2 = Buffer.from('qoli')

buf.set(buf2)

console.log(buf.toString())
