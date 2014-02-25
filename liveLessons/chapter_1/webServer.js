/**
 * Created by Rahul on 2/25/14.
 */
var http = require('http'),
    server = http.createServer(function (req, res) {
        var temp = "Hey, thanks for calling";
        res.writeHead(200, {"content-type": "text/plain",
            "content-length": temp.length
        });
        res.end(temp);
    });
server.listen(8080);
