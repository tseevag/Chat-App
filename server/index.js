const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const router = require('./router');

app.use(router);

const {addUser, removeUser, getUser, getUserInRoom} = require('./users');

const PORT = process.env.PORT || 5000;

io.on('connection',(socket) => {
    socket.on('join', ({ name, room }, cb) => {
        const { error, user } = addUser({id:socket.id, name, room});

console.log("added u:",user);

        if(error) {
            return cb(error);
        } else {
            socket.emit('message', { user: 'admin', message: `${name}, welcome to room ${room}`});
            socket.broadcast.to(room).emit('message', { user: 'admin', message: `${name} has joined the chat !!`});
        
            socket.join(room);

        }

        
    });

    socket.on('chat message', (message, cb) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, message});

        cb();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user: 'admin', message: `${user.name} left the chat !!`});
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

