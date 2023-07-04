const { messageManager } = require('../dao/MongoDB')

const socketChat = io => {
    io.on('connection', async socket => {
		const messages = await messageManager.getMessages()
        socket.emit('chat', {
            client: socket.client.id,
            message: 'Client connected',
			messages
        })
        socket.on('user', user => {
            socket.broadcast.emit('user', user)
        })
        socket.on('message', async data => {
            await messageManager.addMessage(data)
            io.emit('messages', data)
        })
    })
}

module.exports = socketChat
