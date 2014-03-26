/**
 * Created by Rahul on 3/24/14.
 */
var mongoose = require('mongoose');
var uri = 'mongodb://localhost/photo_app';
mongoose.connect(uri);

var schema = new mongoose.Schema({
    name: String,
    path: String
});

module.exports = mongoose.model('Photo', schema);