const socketio = require('socket.io');
const path = require('path');
const express = require('express');
const compression = require('compression');

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();
const server = require('http').createServer(app);


// Will host all of the files in the path
const clientPath = path.resolve(`${__dirname}/../client`);
app.use('/', express.static(clientPath));
app.use(compression()); // use compression to "zip"

router(app);

server.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`listening on port ${port}`);
});


// Socket IO code
// /////////////////////////////////////////////////////////////

// object to hold users
const users = {};

const io = socketio(server);

const onJoined = (sock) => {
  const socket = sock;
  socket.on('join', (data) => {
    if(Object.keys(users).length < 2){
      socket.join('room1');
      users[data.name] = data.name;
      console.log(`dataName is: ${data.name}`);

      socket.emit('setUser', { name: Object.keys(users).length });

      console.log(`User connected ${Object.keys(users).length}`);
    }
  });

};

const onDisconnect = (sock) => {
  const socket = sock;

  socket.on('disconnect', () => {
    console.log(`disconnecting user ${socket.name}`);
    delete users[socket.name];
    socket.leave('room1');
    socket.broadcast.to('room1').emit('p2Left');
  });
};

const player1PosTrack = (sock) => {
  const socket = sock;

  socket.on('update', (data) => {
    socket.broadcast.to('room1').emit('updateP2', data);
  });
};

io.sockets.on('connection', (socket) => {
  console.log('started');

  onJoined(socket);
  onDisconnect(socket);
  player1PosTrack(socket);
});

