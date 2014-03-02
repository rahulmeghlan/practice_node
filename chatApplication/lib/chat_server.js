/**
 * Created by Rahul on 3/2/14.
 */
var socketIO = require('socket.io'),
    io,
    guestNumber = 1,
    nickNames = {},
    namesUsed = [],
    currentRoom = {};

exports.listen = function (server) {
    io = socketIO.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', function (socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'Lobby');

        handleMessageBroadCasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);

        socket.on('rooms', function () {
            socket.emit('rooms', io.sockets.manager.rooms);
        });

        handleClientDisconnection(socket, nickNames, namesUsed);
    });
};

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
    var name = 'Guest' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    namesUsed.push(name);
    return guestNumber + 1;
}

function joinRoom(socket, room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult', {room: room});
    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + 'has joined' + room + '.'
    });

    var userInRoom = io.sockets.clients(room);
    if (userInRoom.length > 1) {
        var usersInRoomSummary = 'Users currently in ' + room + ':';
        for (var index in userInRoom) {
            var userSocketId = userInRoom[index].id;
            if (userSocketId !== socket.id) {
                if (index) {
                    usersInRoomSummary += ", ";
                }
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
        usersInRoomSummary += ".";
        socket.emit('message', {text: usersInRoomSummary});
    }
}

function handleMessageBroadCasting(socket){
    socket.on('message', function(message){
        socket.broadcast.to(message.room).emit('message',{
            text : nickNames[socket.id] + ":" + message.text
        });
    });
}

function handleRoomJoining(socket){
    socket.on('join', function(room){
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    });
}

function handleClientDisconnection(socket){
    socket.on('disconnect', function(){
        var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
}