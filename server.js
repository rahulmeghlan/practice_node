var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response){
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		if(pathname === "/favicon.ico") return false;
		console.log("===================================");
		console.log("Request for : " + pathname + " received.");
		
		request.setEncoding("utf8");
		
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("recieved POST data chunk '" + postDataChunk + "'.");
		});
		
		
		request.addListener("end", function(){
			console.log(postData);
			route(handle, pathname, response, postData);
		});
		
		// route(handle, pathname, response);
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;
