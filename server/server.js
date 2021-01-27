const server = require('http').createServer();
const io = require('socket.io')(server, {});
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('join', ({id, name}, callback) => {
    console.log(`adding user "${name}" with id: "${socket.id}" to chat room`);
    const {error, user} = addUser({id, socketId: socket.id, name, room: 'Chat Room'});

    if (error) return callback(error);

    socket.join(user.room);
    // socket.emit('joined', {id: socket.id});

    socket.emit('message', {type: 'system', content: `${user.name}, welcome to ${user.room}`});
    socket.broadcast.to(user.room).emit('message', {type: 'system', content: `${user.name} has joined`});

    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

    callback();
  });

  socket.on('sendMessage', (senderId, message, callback) => {
    const user = getUser(senderId);
    console.log(`In send message. User is: ${user}`);

    io.to(user.room).emit('message', {user: user.name, content: message});

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {user: 'Admin', content: `${user.name} has left.`});
      // io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});


server.listen(6969);
