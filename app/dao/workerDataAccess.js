const connection = require('../mongo.connection');
const test = require('assert');


function getAllOrders(callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.find({}).toArray((err, data) => {
        test.strictEqual(null, err);
        callback(data);
    })
}

module.exports = {
    getAllOrders
}