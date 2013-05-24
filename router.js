function route(handle, pathname, response){
	console.log("About to route a request for : " + pathname);
	if(typeof handle[pathname] === "function"){
	 // return handle[pathname](response);	
	 handle[pathname](response);	
	}else{
		// return "404 Not Found";
		response.write("404 Not Found");
		response.end();
	}
	
	console.log("************************************");
}

exports.route = route;
