/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/19/14
 * Time: 2:56 PM
 * To change this template use File | Settings | File Templates.
 */
var connect = require("connect");

var app = connect()
    .use(connect.favicon())
    .use(connect.cookieParser('keyboard cat'))
    .use(connect.session())
    .use(function (req, res) {
        var session = req.session;
        if (session.views) {
            res.setHeader('Content-Type', 'text/html');
            res.write('<p>Views :' + session.views + '</p>');
            res.end();
            session.views++;
        } else {
            session.views = 1;
            res.end('Welcome to the session demo. refresh !');
        }
    }).listen(3000);