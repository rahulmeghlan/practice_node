/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/18/14
 * Time: 12:17 PM
 * To change this template use File | Settings | File Templates.
 */
function logger(req, res, next) {
    console.log("%s %s", req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

function restrict(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));

    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    next();
}

function admin(req, res, next) {
    switch (req.url) {
        case '/' :
            res.end('try /users');
            break;
        case '/users' :
            res.setHeader('Content-Type', 'application/json');
            res.end({"name" : "rahul meghlan"});
    }
}

var connect = require('connect');
connect().use(logger).use('/admin', restrict).use('/admin', admin).use(hello).listen(3000);