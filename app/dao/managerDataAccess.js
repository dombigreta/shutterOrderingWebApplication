const connection = require('../mongo.connection');
const test = require('assert');
const logger = require('../winston.config');
const ObjectId = require('mongodb').ObjectID;
const statesOfOrder = require('../../client/src/utils/stateOfOrderConstants');


function getAllOrders(callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.find({'stateOfOrder':{'$in':[statesOfOrder.SUBMITTED, statesOfOrder.DONE, statesOfOrder.PAYED]}}).toArray((err, data) => {
        test.strictEqual(null, err);
        logger.info(`data:${JSON.stringify(data)}`);
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
        $set:{'workerId':ObjectId(workerId), 'statetOfOrder': statesOfOrder.ASSIGNED_TO_WORKER}
    }).then(data => {
        test.notEqual(null,data);
            logger.info('updating was successful');
            logger.debug(`data:${JSON.stringify(data)}`);
            callback(data);
    }).catch(err => logger.debug(err));
}

function closeOrder(orderId, callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.updateOne({"_id":ObjectId(orderId)},{
        $set:{'isPayed':true, 'stateOfOrder':statesOfOrder.PAYED}
    }).then(data => {
        test.notEqual(null,data);
            logger.info('updating was successful');
            logger.debug(`data: ${JSON.stringify(data)}`);
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
        logger.debug(`data :${JSON.stringify(data)}`);
        callback(data);
    })
}

function getShuttersDataForStatistics(callback){
    const db = connection.getDatabase();
    const collection = db.collection('shutters');
    collection.find({}).toArray((err, data) => {
        test.strictEqual(null, err);
        logger.info('getting the shutter data back');
        logger.debug(`data: ${JSON.stringify(data)}`)
        callback(data);
    });
}


module.exports = {
    getAllOrders,
    getAllOrdersOfTheCompany,
    getCustomerDataByCustomerId,
    getWorkersDataForInstallation,
    organiseInstallation,
    getOrderById,
    getShutterDataByIds,
    closeOrder,
    getShuttersDataForStatistics
}