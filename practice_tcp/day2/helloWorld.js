(function () {
    require("http").createServer(function (req, res) {
        writeInFile({"fileName" : "requestObject.json", "data" : req});
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Hello World");
        writeInFile({"fileName" : "responseObject.json", "data" : res});
    }).listen(4000);

    var writeInFile = function(fileObject){
       var fs = require("fs"),
            util = require('util');
        fs.writeFile(fileObject.fileName, util.inspect(fileObject.data), function(err){
            console.log(err ? err : "Content was successfully written !!!");
        });
    };
})();

