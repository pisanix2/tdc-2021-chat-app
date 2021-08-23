const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.json())
const http = require('http')
const server = http.createServer(app)
const io = require("socket.io")(server, { cors: { origin: "*" } })

const sequelize = require('integrations/sequelize')

const Contact = require('modules/Contact')
app.use('/api/contact', Contact.router)

const Message = require('modules/Message')
app.use('/api/message', Message.router)

// sequelize.associate()

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`)

  socket.on('disconnect', () =>
    console.log(`Disconnected: ${socket.id}`))

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`)
    socket.join(room)
  })

  socket.on('leave', (room) => {
    console.log(`Socket ${socket.id} leaving ${room}`)
    socket.leave(room)
  })

  socket.on('chat', (data) => {
    const { message, room } = data
    console.log(`msg: ${message}, room: ${room}`)
    io.to(room).emit('new-message', message)
 })

})

const port = process.env.PORT
server.listen(port, () => {
  console.log(`listening on *:${port}`)
})
