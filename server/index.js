const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const router = require('./router');

app.use(router);

const {addUser, removeUser, getUser, getUserInRoom} = require('./users');

const PORT = process.env.PORT || 5000;

io.on('connection',(socket) => {
    console.log("A user is connected !");

    socket.on('join', ({ name, room }, cb) => {
        console.log(name, room)
        const { error, user } = addUser({id:socket.id, name, room});

        if(error) return cb(error);
        
        socket.emit('message', { user: 'admin', message: `${name}, welcome to the room ${room}`});
        socket.broadcast.to(room).emit('message', { user: 'admin', message: `${name} has joined chat !!`});
        
        socket.join(room);
    });

    socket.on('chat message', (message, cb) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, message});

        cb();
    })

    socket.on('disconnect', () => {
        console.log('User has left !');
    });
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

