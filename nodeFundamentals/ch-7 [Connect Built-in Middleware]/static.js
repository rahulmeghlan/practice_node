/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/19/14
 * Time: 3:41 PM
 * To change this template use File | Settings | File Templates.
 */
var connect = require("connect");

var app = connect()
    .use(connect.static('public'))
    .listen(3000);