/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/18/14
 * Time: 11:55 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoDB = require('mongodb'),
    server = new mongoDB.Server('127.0.0.1', 27017, {}),
    client = new mongoDB.Db('myDatabase', server, {w: 1});

client.open(function (err) {
    if (err) throw err;
    client.collection('test_insert', function (err, collection) {
        if (err) throw err;
        console.log('We are now able to perform queries');

        collection.insert({
                'title': 'I like cake',
                'body': 'It is quite good.'
            },
            {safe: true}, function (err, document) {
                if (err) throw err;
                console.log("Document ID is : " + document[0]._id);
            })
    });
});