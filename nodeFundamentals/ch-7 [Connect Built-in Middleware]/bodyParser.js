/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/19/14
 * Time: 12:58 PM
 * To change this template use File | Settings | File Templates.
 */
var connect = require("connect");
var app = connect()
    .use(connect.bodyParser())
    .use(function (req, res) {
        console.log(req.body);
        console.log(req.files);
        res.end('thanks!');
    }).listen(3000);

