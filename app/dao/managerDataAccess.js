const connection = require('../mongo.connection');
const test = require('assert');
const ObjectId = require('mongodb').ObjectID;


function getAllOrders(callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.find({"isDone":true}).toArray((err, data) => {
        test.strictEqual(null, err);
        callback(data);
    })
}
function getCustomerDataByCustomerId(customerId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('customers');
    collection.findOne({"_id":ObjectId(customerId)},(err, data) => {
        test.strictEqual(null,err);
        callback(data);
    })
}
module.exports = {
    getAllOrders,
    getCustomerDataByCustomerId
}