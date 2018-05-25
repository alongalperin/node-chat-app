const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname,'../public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');        
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});