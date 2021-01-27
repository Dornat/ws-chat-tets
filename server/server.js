const server = require('http').createServer();
const io = require('socket.io')(server, {});
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

io.on('connection', (socket) => {
  socket.on('join', ({id, name}, callback) => {
    console.log(`Trying to add user "${name}" with id: "${socket.id}"`);
    const {error, user} = addUser({id, socketId: socket.id, name, room: 'Chat Room'});

    if (error) {
      console.log('Failed to add user. Error: ', error);
      return callback(error);
    }

    socket.join(user.room);
    console.log(`Added user "${name}" with id: "${socket.id}" to "${user.room}"`);
    // socket.emit('joined', {id: socket.id});

    socket.emit('message', {type: 'system', content: `${user.name}, welcome to ${user.room}`});
    socket.broadcast.to(user.room).emit('message', {type: 'system', content: `${user.name} has joined`});
    console.log(`users are:`, getUsersInRoom(user.room));

    // io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

    callback();
  });

  socket.on('sendMessage', (senderId, message, callback) => {
    const user = getUser(senderId);
    console.log(`In send message. Sender is: `, user);

    io.to(user.room).emit('message', {user: user.name, content: message});

    callback();
  });

  socket.on('disconnect', () => {
    console.log(`Trying to disconnect user with socket.id: ${socket.id}`);
    const user = removeUser(socket.id);

    if (user) {
      console.log(`Removed user "${user.name}" with socket.id: "${socket.id}" from users`);
      io.to(user.room).emit('message', {user: 'Admin', content: `${user.name} has left.`});
      // io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});


server.listen(6969);
