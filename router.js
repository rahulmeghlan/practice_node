function route(handle, pathname){
	console.log("About to route a request for : " + pathname);
	if(typeof handle[pathname] === "function"){
	 return handle[pathname]();	
	}else{
		return "No request handler found for : " + pathname;
		console.log("No request handler found for : " + pathname)
	}
	
	console.log("************************************");
}

exports.route = route;
