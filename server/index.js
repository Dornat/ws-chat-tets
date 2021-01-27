const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

const router = require('./router');

// const app = express();
const server = http.createServer();
const io = socketio(6969, {});

// app.use(cors());
// app.use(router);

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.emit('connect', 'success');
  socket.emit('hello', 'world');

  socket.on('join', ({name, room}, callback) => {
    console.log(name, room);
    socket.emit('joined', {name, room})
    // const {error, user} = addUser({id: socket.id, name, room});
    //
    // if (error) return callback(error);
    //
    // socket.join(user.room);
    //
    // socket.emit('message', {user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    // socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`});
    //
    // io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

    // callback();
  });
});
// io.on('join', ({ name, room }, callback) => {
//   const { error, user } = addUser({ id: socket.id, name, room });
//
//   if(error) return callback(error);
//
//   socket.join(user.room);
//
//   socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
//   socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
//
//   io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
//
//   callback();
// });
//
// io.on('sendMessage', (message, callback) => {
//   const user = getUser(socket.id);
//
//   io.to(user.room).emit('message', { user: user.name, text: message });
//
//   callback();
// });
//
// io.on('disconnect', () => {
//   const user = removeUser(socket.id);
//
//   if(user) {
//     io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
//   }
// })

// io.listen(6969, () => console.log(`Server has started.`));
