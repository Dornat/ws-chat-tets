const server = require('http').createServer();
const io = require('socket.io')(server, {});
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

io.on('connection', (socket) => {
  socket.on('join', ({name}, callback) => {
    console.log(`Trying to add user "${name}" with id: "${socket.id}"`);
    const {error, user} = addUser({id: socket.id, name, room: 'Chat Room'});

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

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log(`In send message. Sender is: `, user);
    if (!user) {
      return callback('No user found')
    }

    io.to(user.room).emit('message', {user: user.name, content: message});

    callback();
  });

  socket.on('disconnect', () => {
    console.log(`Trying to disconnect user with socket.id: ${socket.id}`);
    const user = removeUser(socket.id);

    if (user) {
      console.log(`Removed user "${user.name}" with socket.id: "${socket.id}" from users`);
      console.log(`users are:`, getUsersInRoom(user.room));
      // io.to(user.room).emit('message', {user: 'Admin', content: `${user.name} has left.`});
      socket.broadcast.to(user.room).emit('message', {type: 'system', content: `${user.name} has left`});
      // io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});


server.listen(6969);
