var express = require('express');
var app = express();
var server = require('http').Server(app);
const io = require("socket.io")(server);

app.use(express.static('client'));

var messages = [{
    id: 1,
    text: 'Welcome to privacy chat from Licha',
    nickname: 'Bot - Licha'
}];

io.on('connection', function(socket){
    console.log("The client with IP: " +socket.handshake.address+ " has connected...");

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });


});

server.listen(6677, function(){
    console.log('Server is running in http://localhost:6677');
});