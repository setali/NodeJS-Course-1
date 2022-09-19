import { redisClient } from './config/redis'
import Message from './models/message'

export default (io, socket) => {
  console.log('User connected')

  const {
    request: { user }
  } = socket

  saveId()

  console.log(socket.id)

  socket.emit('user_connected', user)

  socket.on('message', async data => {
    const message = new Message(data)
    await message.save()

    const receiver = await getId(data.to)

    socket.to(receiver).emit('message', message)
    socket.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    removeId()
  })

  function saveId () {
    redisClient.set(`socketIds:${user.id}`, socket.id)
  }

  function removeId () {
    redisClient.del(`socketIds:${user.id}`)
  }

  function getId (id) {
    return redisClient.get(`socketIds:${id}`)
  }
}
