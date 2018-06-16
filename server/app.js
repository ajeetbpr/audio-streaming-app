const path = require('path');
const express  = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');

var app = new express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname,'./../client')));

io.on('connection', (socket) => {
	console.log("new connection");
	// message on disconnection
	socket.on('disconnect', () => {
		io.emit('newMessage','disconnected');
	});

	// emit event on a new pop 

	socket.on('newMessage', (message) => {
		console.log("new message",message);
		if(message == "pop"){
			socket.emit('newMessage','enableGreenBtn');
		}
	});
});
server.listen(3000 , () => {
	console.log("server is runnig");
});