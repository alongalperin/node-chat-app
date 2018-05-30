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
    
    socket.emit('newMessage', {
        from: 'admin',
        text: 'welcome to chat'
    });
    
    socket.broadcast.emit('newMessage', {
       from: 'admin',
        text: 'newMember'
    });
    
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');        
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});