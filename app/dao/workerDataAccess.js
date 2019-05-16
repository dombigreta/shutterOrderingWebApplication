const connection = require('../mongo.connection');
const test = require('assert');
const logger = require('../winston.config');
const ObjectId = require('mongodb').ObjectID;
const statesOfOrder = require('../../client/src/utils/stateOfOrderConstants');




function getAllOrders(workerId,callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.find({"workerId":ObjectId(workerId)}).toArray((err, data) => {
        test.strictEqual(null, err);
        logger.info('orders are coming back for worker');
        callback(data);
    })
}

function getOrderById(orderId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.findOne({"_id":ObjectId(orderId)},(err, data) => {
            test.strictEqual(null,err);
            logger.info('getting one order at a time');
            logger.debug(JSON.stringify(data));
            callback(data);
        })   
}


function getAllParts(callback){
    const db = connection.getDatabase();
    const collection = db.collection('parts');
    collection.find({}).toArray((err, data) => {
        test.strictEqual(null,err);
        logger.info('parts are coming back for worker');
        callback(data);
    })
}

function startAssemblingOrder(order,callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.updateOne({"_id":ObjectId(order._id)},{$set:{ 
    "dueDateOfAssembling" : new Date(),
    "dateOfSubmittingOrder": new Date(order.dateOfSubmittingOrder),
    "stateOfOrder":statesOfOrder.STARTED_ASSEMBLING,
    "price":order.price,
    "parts":order.parts.map(part => ObjectId(part))}})
    .then((data) => {
        test.notEqual(null, data);
        logger.info('updating was successful');
        logger.debug(JSON.stringify(data));
        callback(data);
    }).catch((err) => logger.debug(err));
}

function finishOrder(orderId,callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.updateOne({"_id":ObjectId(orderId)},{$set:{'stateOfOrder':statesOfOrder.DONE}})
    .then((data) => {
        test.notEqual(null, data);
        logger.info('updating was successful');
        logger.debug(JSON.stringify(data));
        callback(data);
    }).catch((err) => logger.debug(err));
}

module.exports = {
    getAllOrders,
    getOrderById,
    getAllParts,
    startAssemblingOrder,
    finishOrder
}