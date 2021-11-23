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

io.on('connection', (socket) => {
    const userId = await fetchUserId(socket);
    console.log(`User ${userID} has joined`)
    socket.broadcast.emit("chat message", `user ${userID} has connected`)
    users[socketId] = "testname"
    socket.on("chat message", (msg) => {
        console.log(`Message: ${msg}`)
        io.emit("chat message", `${userID}: ${msg}`)
    })

    socket.on('disconnect', () => {
        console.log(`User ${userID} disconnected`)
        socket.broadcast.emit("chat message", "A user has disconnected")
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
}

server.listen(port, () => {console.log(`listening on ${port}`)})