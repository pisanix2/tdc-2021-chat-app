import io from 'socket.io-client'
let socket

export const connect = () => {
  console.log(`Connecting socket...`)
  socket = io.connect(process.env.REACT_APP_API_URL)
}

export const join = (room) => {
  console.log(`Join rom ${room}...`)
  if (socket && room) socket.emit('join', room)
}

export const leave = (room) => {
  console.log(`Leave rom ${room}...`)
  if (socket && room) socket.emit('leave', room)
}

export const disconnect = () => {
  console.log('Disconnecting socket...')
  if(socket) socket.disconnect()
}

export const subscribeToChat = (cb) => {
  if (!socket) return(true)
  socket.on('new-message', msg => {
    console.log('new-message received: ', msg)
    return cb(null, msg)
  })
}

export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room })
}
