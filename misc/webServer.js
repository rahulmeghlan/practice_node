// This is a webserver

var http = require('http');

var server = http.createServer(function(req, res){
	res.writeHead(200, {'content-type' : 'text/plain'});
	res.end("hello World");
});

server.listen(8000);