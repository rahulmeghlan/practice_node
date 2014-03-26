/**
 * Created by Rahul on 3/24/14.
 */

var photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var mv = require('mv');
var join = path.join;

exports.submit = function (dir) {
    return function (req, res, next) {
        var img = req.files.photo.image;
        var name = req.body.photo.name || img.name;
        var path = join(dir, img.name);

        mv(img.path, path, function (err) {
            if (err) return next(err);

            photo.create({
                name: name,
                path: img.name
            }, function (err) {
                if (err) return next(err);
                res.redirect('/');
            });
        });
    };
};


exports.list = function (req, res) {
    photo.find({}, function (err, photos) {
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        });
    });
};


exports.form = function (req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    });
};

exports.download = function (dir) {
    return function (req, res, next) {
        var id = req.params.id;
        photo.findById(id, function (err, photo) {
            if (err) return next(err);
            var path = join(dir, photo.path);
            res.download(path);
        });
    };
};