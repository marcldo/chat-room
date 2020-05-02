const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Run when a client connects
io.on('connection', socket => {

  //.emit shows the message to a single person
  socket.emit('message', 'Welcome to Chat-Room');

  //Broadcast when a user connects (broadcast shows the message to everyone except the user that connected)
  socket.broadcast.emit('message', 'A user has joined the chat');

  //Runs when client disconnects
  socket.on('disconnect', () => {
    //message everybody
    io.emit('message', 'A user has left the chat');
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));