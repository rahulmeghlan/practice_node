/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/13/14
 * Time: 11:41 AM
 * To change this template use File | Settings | File Templates.
 */
var http = require('http'),
    work = require('./lib/timetrack'),
    mysql = require('mysql');

var db = mysql.createConnection({
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'timetrack'
});

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST' :
            switch (req.url) {
                case '/' :
                    work.add(db, req, res);
                    break;
                case '/archive' :
                    work.archive(db, req, res);
                    break;
                case '/delete' :
                    work.delete(db, req, res);
                    break;
            }
            break;
        case 'GET' :
            switch (req.url) {
                case '/':
                    work.show(db, res);
                    break;
                case '/archived' :
                    work.showArchived(db, res);
                    break;
            }
            break;
    }
});

// Create the database table

db.query(
    "CREATE TABLE IF NOT EXISTS work (" +
        "id INT(10) NOT NULL AUTO_INCREMENT, " +
        "hours DECIMAL(5,2) DEFAULT 0," +
        "date DATE, " +
        "archived INT(1) DEFAULT 0," +
        "description LONGTEXT, " +
        "PRIMARY KEY(id))",
    function (err) {
        if (err) throw err;
        console.log('server started...');
        server.listen(3000, '127.0.0.1');
    }
);

