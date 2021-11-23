const socket = io()
const roomInput = document.getElementById("roomName")
const submit = document.getElementById("submit")

submit.addEventListener("click", (e) => {
    socket.emit("roomSelect", roomInput.value)
    
})