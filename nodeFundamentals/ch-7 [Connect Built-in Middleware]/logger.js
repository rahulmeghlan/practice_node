/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/19/14
 * Time: 2:25 PM
 * To change this template use File | Settings | File Templates.
 */
var connect = require("connect");
var fs = require("fs");
var log = fs.createWriteStream('/practice_area/practice_node/practice_node/nodeFundamentals/logs.txt', {flags: 'a'});
var app = connect()
    .use(connect.favicon())
    //    .use(connect.logger('dev')) todo : this will highlight the status code on console
    .use(connect.logger({stream: log}))
    .use(hello)
    .listen(3000);

function hello(req, res) {
    res.end("Hello Word !");
}