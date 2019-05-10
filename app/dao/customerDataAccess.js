const connection = require('../mongo.connection');
const test = require('assert');
const ObjectId = require('mongodb').ObjectID;


function viewOwnOrders(customerId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.find({'customerId': ObjectId(customerId)}).toArray((err, data) => {
        test.strictEqual(null, err);
        callback(data);
    })
}

function createOrder(order,callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders')
    collection.insertOne({
    "customerId":  ObjectId(order.customerId),
    "dueDateOfAssembling" : order.dateOfSubmittingOrder == null ? null : new Date(order.dueDateOfAssembling),
    "dateOfSubmittingOrder": new Date(order.dateOfSubmittingOrder),
    "isInProgress" : order.isInProgress,
    "isDone":order.isDone,
    "isPayed" : order.isPayed,
    "price" : order.price,
    "currency":order.currency,
    "window": {"height":order.window.height, "width":order.window.width},
    "shutter": order.shutter,
    "parts":[]
    }, (err, data) => {
         test.strictEqual(null, err);
         test.strictEqual(1, data.insertedCount)
         callback(true);
     })
}

function getShutterTypes(callback){
    const db = connection.getDatabase();
    const collection = db.collection('shutters');
    collection.find({}).toArray((err, data) => {
       test.strictEqual(null,err);
        callback(data);
    })
}

function getCustomerDataByCustomerId(customerId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('customers');
    collection.findOne({'_id': ObjectId(customerId)},(err, data) => {

        test.strictEqual(null, err);
        callback(data);
    })
}


module.exports = {
    viewOwnOrders,
    createOrder,
    getShutterTypes,
    getCustomerDataByCustomerId
}