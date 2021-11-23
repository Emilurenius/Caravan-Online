const socket = io()

const form = document.getElementById('form')
const input = document.getElementById('input')
const nameInput = document.getElementById('name')
const nameButton = document.getElementById('nameChangeButton')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
        socket.emit("chat message", input.value)
        input.value = ''
    }
})


nameButton.addEventListener('click', (e) => {
    e.preventDefault()
    socket.emit('changeName', nameInput.value)

})

cket.on("chat message", (msg) => {
    const item = document.createElement('li')
    item.textContent = msg
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})