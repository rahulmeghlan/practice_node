/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/19/14
 * Time: 12:25 PM
 * To change this template use File | Settings | File Templates.
 */
var connect = require("connect");
var app = connect()
    .use(connect.cookieParser('tobi is a cool ferret'))
    .use(function (req, res) {
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end('hello\n');
    }).listen(3000);