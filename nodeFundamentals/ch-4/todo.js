/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/11/14
 * Time: 1:51 PM
 * To change this template use File | Settings | File Templates.
 */
var http = require('http'),
    url = require('url'),
    items = [];

http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST' :
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                item += chunk;
            });

            req.end('end', function () {
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET' :
            for (var i = 0; i < items.length; i++) {
                res.write(i + ')' + items[i] + '\n');
            }
            res.end();
            break;
    }
}).listen(8000);
