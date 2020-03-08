const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(5000, () => {
    console.log('Listening request on port 5000');
});

app.use(express.static('public'));

const io = socket(server);
io.on('connection', (socket) => {
    console.log('Made socket connection', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
})