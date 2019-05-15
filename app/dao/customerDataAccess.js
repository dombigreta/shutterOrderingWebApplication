const connection = require('../mongo.connection');
const test = require('assert');
const logger = require('../winston.config');
const ObjectId = require('mongodb').ObjectID;


function viewOwnOrders(customerId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.find({'customerId': ObjectId(customerId)}).toArray((err, data) => {
        test.strictEqual(null, err);
        logger.info('orders are coming back for customer');
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
    "stateOfOrder":1,
    "price" : order.price,
    "currency":order.currency,
    "windows": order.windows.map(window => ({"height": window.height, "width":window.width, "shutter":ObjectId(window.shutter)})),
    "parts":[]
    }, (err, data) => {
         test.strictEqual(null, err);
         test.strictEqual(1, data.insertedCount)
         logger.info(`{inserted count ${data.insertedCount}}`);
         callback(data);
     })
}

function getShutterTypes(callback){
    const db = connection.getDatabase();
    const collection = db.collection('shutters');
    collection.find({}).toArray((err, data) => {
       test.strictEqual(null,err);
       logger.info('Shutter types came back from db');
        callback(data);
    })
}

function getCustomerDataByCustomerId(customerId, callback){
    console.log(customerId);
    const db = connection.getDatabase();
    const collection = db.collection('customers');
    collection.findOne({'_id': ObjectId(customerId)},(err, data) => {
        test.strictEqual(null, err);
        logger.info(`{find data ${data}}`);
        callback(data);
    })
}


module.exports = {
    viewOwnOrders,
    createOrder,
    getShutterTypes,
    getCustomerDataByCustomerId
}