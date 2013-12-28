(function () {
    var fileSystem = require('fs'),
        msg;
    fileSystem.write("requestObject.txt", "test", function (err) {
        msg = err ? err : "The file was saved successfully !!!";
        console.log(msg);
    });
    require("http").createServer(function (req, res) {

        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Hello World");
    }).listen(4000);
})();

