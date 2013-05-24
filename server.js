var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		if(pathname === "/favicon.ico") return false;
		console.log("===================================");
		console.log("Request for : " + pathname + " received.");
		
		response.writeHead(200, {"Content-Type" : "text/plain"});
		// var content = route(handle, pathname, response);
		route(handle, pathname, response);
		// response.write(content);
		// response.end();
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;
