var exec = require("child_process").exec;

function start(response){
	console.log("Request handler 'start' was called");
	var content = "empty";
	
	exec("ls -lah", function(error, stdout, stderr){
		content = stdout;
		console.log(content);
		response.write(content);
		response.end();
	});
	
	// return content;
	
/*
	function sleep(milliSeconds){
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds);
	}
	
	sleep(10000);
*/
	// return "Welcome to the start page.";
}

function upload(response){
	console.log("Request handler 'upload' was called.");
	// return "Welcome to the upload page.";
	response.write("Welcome to the upload page.");
	response.end();
}

exports.start = start;
exports.upload = upload;