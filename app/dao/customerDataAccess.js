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
         logger.info(`updating shutter order count`);
         order.windows.forEach(window => updateShutterStatistics(window.shutter),(err) => {
             if(err !== undefined){
                 callback('something must have happened');
             }
         });
         callback(data);
     })
}

function getShutterTypes(callback){
    const db = connection.getDatabase();
    const collection = db.collection('shutters');
    collection.find({}).toArray((err, data) => {
       test.strictEqual(null,err);
       logger.info(`shutter info ${JSON.stringify(data)}`);
        callback(data);
    })
}

function getCustomerDataByCustomerId(customerId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('customers');
    collection.findOne({'_id': ObjectId(customerId)},(err, data) => {
        test.strictEqual(null, err);
        logger.info(`{find data ${JSON.stringify(data)}}`);
        callback(data);
    })
}

function getShutterById(shutterId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('shutters');
    collection.findOne({'_id':ObjectId(shutterId)},(err, data) =>{
        test.strictEqual(null,err);
        logger.info(`Shutter info: ${JSON.stringify(data)}`);
        callback(data);
    })
}

function updateShutterStatistics(shutterId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('shutters');
    collection.updateOne(   {'_id':ObjectId(shutterId)},
                               {$inc:{'orderCount':1}})
    .then((data, err) => {
        if(err !== undefined){
            callback(err);
        }
        test.strictEqual(undefined,err);
        logger.info(`data obj ${JSON.stringify(data)}`)
        logger.info('update oder count');
    });
}


module.exports = {
    viewOwnOrders,
    createOrder,
    getShutterTypes,
    getCustomerDataByCustomerId
}