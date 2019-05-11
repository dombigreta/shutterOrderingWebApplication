const connection = require('../mongo.connection');
const test = require('assert');
const ObjectId = require('mongodb').ObjectID;



function getAllOrders(workerId,callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.find({"workerId":ObjectId(workerId)}).toArray((err, data) => {
        test.strictEqual(null, err);
        callback(data);
    })
}

function getAllParts(callback){
    const db = connection.getDatabase();
    const collection = db.collection('parts');
    collection.find({}).toArray((err, data) => {
        test.strictEqual(null,err);
        callback(data);
    })
}

module.exports = {
    getAllOrders,
    getAllParts
}