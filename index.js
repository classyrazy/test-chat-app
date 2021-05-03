const express = require("express")
const socket = require("socket.io")

const app = express();

// listen for request
const port = process.env.PORT || 3000

const server = app.listen(port, ()=>{
    console.log(`already listening on port ${port}`)
})

//middleware and static
app.use(express.static("public"))

//setting socket 
const io = socket(server);
//check for connection
io.on("connection", (socket) => {
    console.log("made socket connection",socket.id)
    socket.on("chat",(data) =>{
        console.log(data)
        io.sockets.emit("chat",data)
        // console.log(io.sockets.emit("chat",data))
    })
    socket.on("typing", (data)=>{
        console.log(data)
        socket.broadcast.emit("typing",data)
    })
    // socket.on("chat",afterRecievingMessage(data,"chat"))
})
// const afterRecievingMessage = (dataRecievedFromFrontEnd,nameOfMessage) =>{
//     io.sockets.emit(nameOfMessage,dataRecievedFromFrontEnd)
// }