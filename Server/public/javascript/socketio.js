const socket = io()

const messageForm = document.getElementById("messageForm")
const changeNameForm = document.getElementById("changeNameForm")

const submitButton = document.getElementById('submitButton')
const input = document.getElementById('input')
const nameInput = document.getElementById('nameInput')
const nameButton = document.getElementById('nameChangeButton')

var name = ''

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

socket.on("chat message", (msg) => {
    const item = document.createElement('li')
    item.textContent = msg
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})

function sendPrivateMessage(msg) {
    socket.emit('privateMessage', msg)
}