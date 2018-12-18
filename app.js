const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const users = require('./routes/user');
const profiles = require('./routes/profile');
const chat = require('./routes/chat');
const SocketIo = require('socket.io');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = new SocketIo(server);
const socketEvents = require('./lib/socketEvents')(io);

app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(express.static('/uploads'));

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

const PORT = process.env.PORT || 5000;

server.listen(PORT, function(){
    console.log(`Server is running on PORT ${PORT}`);
});