const buf = Buffer.from('Ali')

console.log(typeof buf)
console.log(Array.isArray(buf))

for (const b of buf) {
  console.log(b)
}

buf.forEach(console.log)
