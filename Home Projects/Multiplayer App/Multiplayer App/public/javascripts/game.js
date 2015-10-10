var socket = io.connect('localhost:1337');

socket.on('news', function (data) {
	console.log(data);
	socket.emit('uservisited', { my: 'data' }
);
});