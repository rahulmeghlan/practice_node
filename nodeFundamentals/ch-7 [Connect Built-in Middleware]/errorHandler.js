/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/19/14
 * Time: 3:14 PM
 * To change this template use File | Settings | File Templates.
 */
var connect = require("connect");
var app = connect()
    .use(connect.logger('dev'))
    .use(function (req, res, next) {
        setTimeout(function () {
            next(new Error('something broke!'));
        }, 500);
    })
    .use(connect.errorHandler())
    .listen(3000);