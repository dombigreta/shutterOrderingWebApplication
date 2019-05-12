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

function getOrderById(orderId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.findOne({"_id":ObjectId(orderId)},(err, data) => {
            test.strictEqual(null,err);
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

function startAssemblingOrder(order,callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
   
    collection.updateOne({"_id":ObjectId(order._id)},{$set:{ 
    "customerId":  ObjectId(order.customerId),
    "dueDateOfAssembling" : new Date(),
    "dateOfSubmittingOrder": new Date(order.dateOfSubmittingOrder),
    "isInProgress" : order.isInProgress,
    "isDone":order.isDone,
    "isPayed" : order.isPayed,
    "price" : order.price,
    "currency":order.currency,
    "window": {"height":order.window.height, "width":order.window.width},
    "shutter": ObjectId(order.shutter),
    "parts":order.parts.map(part => ObjectId(part))}})
    .then((data) => {
        test.notEqual(null, data);
        callback(data);
    }).catch((err) => console.log(err));
}

function finishOrder(orderId,callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.updateOne({"_id":ObjectId(orderId)},{$set:{"isDone":true}})
    .then((data) => {
        test.notEqual(null, data);
        callback('success');
    }).catch((err) => console.log(err));
}

module.exports = {
    getAllOrders,
    getOrderById,
    getAllParts,
    startAssemblingOrder,
    finishOrder
}