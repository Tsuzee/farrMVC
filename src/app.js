const socketio = require('socket.io');
const path = require('path');
const express = require('express');
const compression = require('compression');

// /////////////////////////////////////////////////////////////////////////////
// adding items for making a login system and stuff
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const csrf = require('csurf');

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/COSC';

mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

let redisURL = {
  hostname: 'localhost',
  port: 6379,
};

let redisPASS;

if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPASS = redisURL.auth.split(':')[1];
}
// /////////////////////////////////////////////////////////////////////////////

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();
const server = require('http').createServer(app);


// Will host all of the files in the path
const clientPath = path.resolve(`${__dirname}/../client`);
app.use('/', express.static(clientPath));
app.use(compression()); // use compression to "zip"

// /////////////////////////////////////////////////////////////////////////////
// more login and stuff
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPASS,
  }),
  secret: 'Domo Arigato',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(favicon(`${__dirname}/../client/img/favicon.png`));
app.disable('x-powered-by');
app.use(cookieParser());

app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  return false;
});
// /////////////////////////////////////////////////////////////////////////////

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
    console.log(data.name);
    console.log(data.roomname);

    socket.name = data.name;
    socket.roomname = data.roomname;

    socket.join(data.roomname);

    users[data.name] = data.name;
    socket.name = data.name;

    console.log(`dataName is: ${data.name}`);

    socket.emit('setUser', { name: Object.keys(users).length });

    console.log(`User connected ${Object.keys(users).length}`);
  });
};


// change to use array to get room name based on user disconnecting
const onDisconnect = (sock) => {
  const socket = sock;

  socket.on('disconnect', () => {
    console.log(`disconnecting user ${socket.name}`);
    delete users[socket.name];
    socket.leave(socket.name);
    socket.broadcast.to(socket.roomname).emit('p2Left');
    console.log(users);
  });
};

// move to client side
const playerUpdater = (sock) => {
  const socket = sock;

  // player position updates
  socket.on('update', (data) => {
    socket.broadcast.to(socket.roomname).emit('updateP2', data);
  });

  socket.on('enemyDefeated', (data) => {
    socket.broadcast.to(socket.roomname).emit('updateEnemyList', data);
  });

  socket.on('bottle', (data) => {
    console.log('Update Bottle List');
    socket.broadcast.to(socket.roomname).emit('updateBottleList', data);
  });

  socket.on('crystal', (data) => {
    console.log('Update Crystal List');
    socket.broadcast.to(socket.roomname).emit('updateCrystalList', data);
  });

  // new level information update
  socket.on('newLevel', (data) => {
    console.log('Sending new level data');
    socket.broadcast.to(socket.roomname).emit('newLevelData', data);
  });

  // pause/resume game
  socket.on('pauseGame', () => {
    socket.broadcast.to(socket.roomname).emit('pause');
  });

  socket.on('resumeGame', () => {
    socket.broadcast.to(socket.roomname).emit('unpause');
  });

  socket.on('player2', () => {
    console.log('second player joined');
    socket.broadcast.to(socket.roomname).emit('secondPlayer');
  });
};

io.sockets.on('connection', (socket) => {
  console.log();
  console.log('started');

  onJoined(socket);
  onDisconnect(socket);
  playerUpdater(socket);
});

