// make connection
// const socket = io.connect("https://test-chat-app.vercel.app/")
// const socket = io.connect("http://localhost:3000")
const socket = io();
const nameInput = document.querySelector("#handle")
const messageInput = document.querySelector("#message")
const submitBtn = document.querySelector("#submit")
const chatOutput = document.querySelector(".chat-output")
const feedback = document.querySelector("#feed-back")

// send message event

submitBtn.addEventListener("click",e =>{
    e.preventDefault()
    socket.emit("chat",{
        message: messageInput.value.trim(),
        handle: nameInput.value.trim()
    })
    messageInput.value = ""
})
messageInput.addEventListener("keypress", ()=>{
    console.log(socket.emit("typing",nameInput.value.trim()))
    socket.emit("typing",nameInput.value.trim())
})


// listen for sockets
socket.on("chat",(data) =>{
    feedback.innerHTML = "";
    chatOutput.innerHTML += `<p><strong>${data.handle}</strong>${data.message}</p>`
})
socket.on("typing",(data) =>{
    feedback.innerHTML = `<p><em>${data} is typing a mesaage</em></p>`
})
// let renderMessages = (data) =>{
//     chatOutput.innerHTML += `<p><strong>${data.handle}</strong>${data.message}</p>`
// }

