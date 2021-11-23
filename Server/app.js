const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const { captureRejectionSymbol } = require('events')
const io = new Server(server)
var users = {}

const rooms = io.of("/").adapter.rooms;
const sids = io.of("/").adapter.sids;

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

// Socket is basically user link

io.on('connection', async (socket) => {
    console.log(`User ${socket.id} has joined`)
    socket.broadcast.emit("chat message", `user ${users[socket.id]} has connected`)
    users[socket.id] = socket.id
    console.log(`User ${socket.id} has been added as ${users[socket.id]}`)
    socket.on("chat message", (msg) => {
        console.log(`Message: ${msg}`)
        io.emit("chat message", `${users[socket.id]}: ${msg}`)
    })

    socket.on('disconnect', () => {
        console.log(`User ${users[socket.id]} disconnected`)
        socket.broadcast.emit("chat message", `${users[socket.id]} has disconnected`)
    })

    socket.on('changeName', (name) => {
        users[socket.id] = name
    })

    //Event when user clicks the play button after giving a roomname
    // socket.on('joinRoom', () => {
    //     console.log("User joined a room")
    //     if room in sessions {
    //         //If the roomname exists, check if full, otherwise join it
    //     }
    //     else {
    //         //If the roomname doesnt exist, create it.
    //     }
    //     socket.join(room)
    // })
})

server.listen(port, () => {console.log(`listening on ${port}`)})