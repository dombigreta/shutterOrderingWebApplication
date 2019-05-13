const connection = require('../mongo.connection');
const test = require('assert');
const logger = require('../winston.config');
const ObjectId = require('mongodb').ObjectID;


function getAllOrders(callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.find({$or :[{"isDone":true },{"workerId":null}]}).toArray((err, data) => {
        test.strictEqual(null, err);
        logger.info('orders are coming back for manager');
        callback(data);
    })
}

function getAllOrdersOfTheCompany(callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.find().toArray((err, data) => {
        test.strictEqual(null, err);
        logger.info('orders are coming back for manager');
        callback(data);
    })
}


function getOrderById(orderId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.findOne({"_id":ObjectId(orderId)},(err, data) => {
            test.strictEqual(null,err);
            logger.info('getting one order at a time');
            logger.debug(data);
            callback(data);

        })   
}

function getCustomerDataByCustomerId(customerId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('customers');
    collection.findOne({"_id":ObjectId(customerId)},(err, data) => {
        test.strictEqual(null,err);
        logger.info('getting one customer at a time');
        logger.debug(data);
        callback(data);
    })
}

function getWorkersDataForInstallation(callback){
    const db = connection.getDatabase();
    const collection = db.collection('workers');
    collection.find({}).toArray((err, data) => {
        test.strictEqual(null, err);
        logger.info('customers are coming back for manager');
        callback(data);
    })
}

function organiseInstallation(orderId, workerId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.updateOne({"_id":ObjectId(orderId)},{
        $set:{"workerId":ObjectId(workerId)}
    }).then(data => {
        test.notEqual(null,data);
            logger.info('updating was successful');
            logger.debug(data);
            callback(data);
    }).catch(err => logger.debug(err));
}

function closeOrder(orderId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.updateOne({"_id":ObjectId(orderId)},{
        $set:{"isPayed":true}
    }).then(data => {
        test.notEqual(null,data);
            logger.info('updating was successful');
            logger.debug(data);
            callback(data);
    }).catch(err => logger.debug(err));

}

function getShutterDataByIds(windows,callback){
    const db = connection.getDatabase();
    const collection = db.collection('shutters');
    collection.find({"_id":
                            {"$in" :windows.map(x => ObjectId(x.shutter))}
                    }).toArray((err, data) => {
        test.strictEqual(null,err);
        logger.info('getting  the shutters back');
        logger.debug(data);
        callback(data);
    })
}


module.exports = {
    getAllOrders,
    getAllOrdersOfTheCompany,
    getCustomerDataByCustomerId,
    getWorkersDataForInstallation,
    organiseInstallation,
    getOrderById,
    getShutterDataByIds,
    closeOrder
}