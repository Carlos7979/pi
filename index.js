const { connect } = require('mongoose')
const app = require('./src/app.js')
const { env: { pid, MONGO_URL: url, PORT: port, mode } } = require('./src/config')
const { Server } = require('socket.io')
const { socketServer, socketChat } = require('./src/socket')

;(async () => {
    await connect(url, { useNewUrlParser: true })
    const httpServer = app.listen(port, () => {
        console.log(`PI app listening on port ${port}`)
        console.log('\x1b[36m%s\x1b[0m', `http://localhost:${port}`)
		console.log('\x1b[33m%s\x1b[0m', `Mode: ${mode}`)
        console.log(`pid: ${pid}`)
    })
	const io = new Server(httpServer)
    socketServer(io)
    socketChat(io)
})()
