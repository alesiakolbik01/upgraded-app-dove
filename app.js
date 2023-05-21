const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const SocketIo = require('socket.io');
const path = require('path');
const users = require('./routes/user');
const profiles = require('./routes/profile');
const chat = require('./routes/chat');
const app = express();
const server = require('http').Server(app);
const io = new SocketIo(server);
const socketEvents = require('./lib/socketEvents')(io);
const cors = require('cors')

var whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

// app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(express.static('/uploads'));

mongoose.connect(config.DB, { useNewUrlParser: false, useUnifiedTopology: true })
.then(() => {console.log('Database is connected') })
.catch((err)=> {console.log('Can not connect to the database'+ err)})

app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 5000;

server.listen(PORT, function(){
    console.log(`Server is running on PORT ${PORT}`);
});

app.use('/api/users', users);
app.use('/api/profiles', passport.authenticate('jwt', {session: false}), profiles);
app.use('/api/chat', passport.authenticate('jwt', {session: false}), chat);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
});