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

function getOrderById(orderId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.findOne({"_id":ObjectId(orderId)},(err, data) => {
            test.strictEqual(null,err);
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

function getWorkersDataForInstallation(callback){
    const db = connection.getDatabase();
    const collection = db.collection('workers');
    collection.find({}).toArray((err, data) => {
        test.strictEqual(null, err);
        callback(data);
    })
}

function organiseInstallation(orderId, workerId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.updateOne({"_id":ObjectId(orderId)},{
        $set:{"workerId":workerId}
    },(err, data) => {
        if(err){
            callback('Could not update your order');
        }
        else{
            callback('The worker was added to job');
        }
    });
}

function createInvoce(orderId, callback){
    //todo
}
module.exports = {
    getAllOrders,
    getCustomerDataByCustomerId,
    getWorkersDataForInstallation,
    organiseInstallation,
    getOrderById
}