/**
 * Created by Rahul on 3/2/14.
 */
var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    cache = {};

function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(200, {'content-type': mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}

function serveStatic(response, cache, absPath){
    if(cache[absPath]){
        sendFile(response, absPath, cache[absPath]);
    }else{
        fs.exists(absPath, function(exists){
           if(exists){
               fs.readFile(absPath, function(err, data){
                  if(err){
                      send404(response);
                  } else{
                      cache[absPath] = data;
                      sendFile(response, absPath, data);
                  }
               });
           } else{
               send404(response);
           }
        });
    }
}

var server = http.createServer(function(req, res){
   var filePath = false;

    if(req.url === "/"){
        filePath = 'public/ index.html';
    }else{
        filePath = "public" + req.url;
    }

    var absPath = "./" + filePath;
    serveStatic(res, cache, absPath);
});

server.listen(8080, function(){
   console.log("server listening on port 8080");
});