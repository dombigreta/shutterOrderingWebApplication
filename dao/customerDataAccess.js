const connection = require('../mongo.connection');

function getCustomers(callback){
    const db = connection.getDatabase();
    const collections = db.collection('customers');
    collections.find({}).toArray((err, data) => {
        if(err){
            return callback(err);
        }
        return callback(null, data);
    })
}

function viewOwnOrders(callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders');
    collection.find({}).toArray((err, data) => {
        if(err){
            //handle
        }
        callback(data);
    })
}

function createOrder(order,callback){
    const db = connection.getDatabase();
    const collection = db.collection('orders')
    collection.insert
}

function addWindowDetails(windowDetails,callback){

}

function getShutterTypes(callback){
    const db = connection.getDatabase();
    const collection = db.collection('shutters');
    collection.find({}).toArray((err, data) => {
        if(err){
            //handle
        }
        callback(data);
    })
}

module.exports = {
    viewOwnOrders,
    createOrder,
    addWindowDetails,
    getCustomers,
    getShutterTypes
}