const mongoClient = require('mongodb').MongoClient;
const config = require('./mongo.config');
const test = require('assert');
var  _db = undefined;

module.exports = {
    connectToServer: function(callback){
        mongoClient.connect(config.host +':'+ config.port,{useNewUrlParser: true}, function(err, client){
            test.equal(null,err);
            test.ok(client.db.length > 0);
            _db = client.db('webtech');
            callback(err);
        });
    },
    getDatabase: function(){
        return _db;
    }
}