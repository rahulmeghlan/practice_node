var exec = require("child_process").exec;
var query_string = require("querystring");

function start(response){
	var body = '<html>'+
'<head>'+
'<meta http-equiv="Content-Type" content="text/html; '+
'charset=UTF-8" />'+
'</head>'+
'<body>'+
'<form action="/upload" method="post">'+
'<textarea name="text" rows="20" cols="60"></textarea>'+
'<input type="submit" value="Submit text" />'+
'</form>'+
'</body>'+
'</html>';

response.writeHead(200, {"Content-Type" : "text/html"});
response.write(body);
response.end();

}

function upload(response, postData){
	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write("Welcome to the upload page.");
	response.write("<br/><b>"+query_string.parse(postData).text+"</b>");
	response.end();
}

exports.start = start;
exports.upload = upload;