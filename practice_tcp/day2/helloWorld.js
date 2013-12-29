(function () {
    var fileSystem = require('fs'),
        util = require('util'),
        msg;
    require("http").createServer(function (req, res) {
        fileSystem.writeFile("requestObject.js", util.inspect(req), function (err) {
            msg = err ? err : "The file was saved successfully !!!";
            console.log(msg);
        });
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Hello World");
    }).listen(4000);
})();

