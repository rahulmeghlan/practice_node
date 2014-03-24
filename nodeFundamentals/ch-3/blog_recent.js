/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/7/14
 * Time: 3:18 PM
 * To change this template use File | Settings | File Templates.
 */
var http = require("http"),
    fs = require("fs");

http.createServer(function (req, res) {
    if (req.url === "/") {
        fs.readFile("./titles.json", function (err, data) {
            if (err) {
                console.error(err);
                res.end('Server Error');
            } else {
                var titles = JSON.parse(data.toString());

                fs.readFile("/public/template.html", function (err, data) {
                    if (err) {
                        console.error(err);
                        res.end('Server Error');
                    } else {
                        var tmpl = data.toString();
                        var html = tmpl.replace('%', titles.join('<li></li>'));
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
                });
            }
        });
    }
}).listen(8000, "127.0.0.1");