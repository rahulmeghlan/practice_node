function start(response){
	console.log("Request handler 'start' was called");
	return "Welcome to the start page.";
}

function upload(response){
	console.log("Request handler 'upload' was called.");
	return "Welcome to the upload page.";
}

exports.start = start;
exports.upload = upload;