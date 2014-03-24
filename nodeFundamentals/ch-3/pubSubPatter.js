/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/10/14
 * Time: 11:44 AM
 * To change this template use File | Settings | File Templates.
 */
var events = require('events'),
    net = require('net'),
    channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};

channel.on('join', function (id, client) {
    this.clients[id] = client;
    var _this = this;
    this.subscriptions[id] = function (senderId, message) {
        if (id !== senderId) {
            _this.clients[id].write(message);
        }
    }
    this.on('broadcast', this.subscriptions[id]);
});

var server = net.createServer(function (client) {
    var id = client.remoteAddress + " : " + client.remotePort;
    client.on('connect', function () {
        channel.emit('join', id, client);
    });

    client.on('data', function (data) {
        data = data.toString();
        channel.emit('broadcast', id, data);
    });
});

server.listen(8888);