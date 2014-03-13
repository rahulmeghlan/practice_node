/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/13/14
 * Time: 11:54 AM
 * To change this template use File | Settings | File Templates.
 */
var qs = require('querystring');

exports.sendHTML = function (res, html) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
};

exports.parseReceivedData = function (req, cb) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        var data = qs.parse(body);
        cb(data);
    })
};

exports.actionForm = function (id, path, label) {
    var html = '<form method = "POST" action="' + path + '">';
    html += '<input type="hidden" name="id" value"' + id + '">';
    html += '<input type="submit" value="' + label + '"/>';
    html += '</form>';
    return html;
};

exports.add = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        db.query(
            "INSERT INTO work (hours, date, description)" +
                "VALUES (?, ?, ?)", [work.hours, work.date, work.description],
            function (err) {
                if (err) throw err;
                exports.show(db, res, false);
            }
        );
    });
};

exports.delete = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        db.query(
            "DELETE FROM work WHERE ID=?",
            [work.id],
            function (err) {
                if (err) throw err;
                exports.show(db, res, false);
            }
        )
    })
};

exports.archive = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        db.query(
            "UPDATE work SET archived=1 where id=?",
            [work.id],
            function (err) {
                if (err) throw err;
                exports.show(db, res, true);
            }
        );
    });
};

exports.show = function (db, res, showArchived) {
    var query = "SELECT * FROM work";
//        "WHERE archived=? " +
//        "ORDER BY date DESC";
    var archiveValue = (showArchived) ? 1 : 0;

    db.query(query, [archiveValue], function (err, rows) {
        if (err) throw err;
        var html = '';
        if (showArchived) {
            html += exports.workHitListHTML(rows);
        } else {
            html = '<a href="/archived">Archived Work</a><br/>';
            html += exports.workFormHTML();
        }
        exports.sendHTML(res, html);
    });
};

exports.showArchived = function (db, res) {
    exports.show(db, res, true)
};

exports.workHitListHTML = function (rows) {
    var html = '<table>';
    for (var i = 0; i < rows.length; i++) {
        html += '<tr>';
        html += '<td>' + rows[i].date + '</td>';
        html += '<td>' + rows[i].hours + '</td>';
        html += '<td>' + rows[i].description + '</td>';
        if (!rows[i].archived) {
            html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>'
        }
        html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>';
        html += '</tr>';
    }
    return html;
};

exports.workFormHTML = function () {
    var html = '<form method="POST" action="/">';
    html += '<p>Date (YYYY-MM-DD):<br/><input name="date" type="text" /> </p>';
    html += '<p>Hours worked: <br/><input name="hours" type="text"></p>';
    html += '<p>Description : <br/>';
    html += '<textarea name="description"></textarea></p>';
    html += '<input type="submit" value="Add">';
    html += '</form>';
    return html;
};

exports.workArchiveForm = function (id) {
    return exports.actionForm(id, '/archive', 'Archive');
};

exports.workDeleteForm = function (id) {
    return exports.actionForm(id, '/delete', 'Delete');
};

