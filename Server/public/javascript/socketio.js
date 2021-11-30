const socket = io()

const messageForm = document.getElementById("messageForm")
const submitButton = document.getElementById('submitButton')
const input = document.getElementById('input')

const changeNameForm = document.getElementById("changeNameForm")
const nameInput = document.getElementById('nameInput')
const nameButton = document.getElementById('nameChangeButton')

const connectForm = document.getElementById("connectForm")
const connectId = document.getElementById("connectId")
const connectButton = document.getElementById("connectButton")

const messages = document.getElementById("messages")

var name = ""

socket.on('connect', () => {
    name = socket.id
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
        console.log("chatmessage")
        socket.emit("chat message", input.value)
        input.value = ''
    }
})

changeNameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("Trying to change name")
    if (nameInput.value) {
        socket.emit("changeName", nameInput.value)
        console.log(`${name} changed name to ${nameInput.value}`)
        name = nameInput.value
        nameInput.value = ''
    }
})

connectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (connectId.value) {
        socket.emit("connectToRoom", connectId.value)
        console.log(`attempting to connect to room ${connectId.value}`)
    }
})

socket.on("chat message", (msg) => {
    const item = document.createElement('li')
    item.textContent = msg
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})

socket.on("console log", (msg) => {
    console.log(`log from server: ${msg}`)
})

socket.on("alert", (msg) => {
    alert(msg)
})

function sendPrivateMessage(msg) {
    socket.emit('privateMessage', msg)
}