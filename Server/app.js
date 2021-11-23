const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

// Reading input from terminal start
const port = parseInt(process.argv[2])
console.log(`${port} registered as server port`)
// Reading input from terminal end

app.use(cors()) // Making sure the browser can request more data after it is loaded on the client computer.
app.use(express.urlencoded({extended:false}))
//app.use(cookieParser()) // Middleware for handling cookies
//app.use(upload()) // Fileupload system

app.use("/static", express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/index.html'))
})

io.on('connection', (socket) => {
    console.log('A user connected')
    socket.broadcast.emit("chat message", "A user has connected")

    socket.on("chat message", (msg) => {
        console.log(`Message: ${msg}`)
        io.emit("chat message", msg)
    })

    socket.on('disconnect', () => {
        console.log("A user disconnected")
        socket.broadcast.emit("chat message", "A user has disconnected")
    })
})

server.listen(port, () => {console.log(`listening on ${port}`)})