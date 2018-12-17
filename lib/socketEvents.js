module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('chat message', function (message) {
            socket.to(message.conversationId).emit('new bc message', message);
        });
        socket.on('join room', function (room) {
            socket.join(room);
            console.log(socket.id + " join " + room);
        });
        socket.on('leave room', function (room){
            if(!room)return;
            socket.leave(room);
            console.log(socket.id + " leave " + room);
        })
    });
};
