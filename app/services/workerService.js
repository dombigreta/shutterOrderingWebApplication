

function WorkerService(dataAccess){
    this.dao = dataAccess || require('../dao/workerDataAccess');
}

WorkerService.prototype.getAllOrders = function(workerId, callback){
    this.dao.getAllOrders(workerId, (data) => callback(data));
}

WorkerService.prototype.getOrderById = function(orderId, callback){
    this.dao.getOrderById(orderId, (data) => callback(data));
}

WorkerService.prototype.getAllParts = function(callback){
    this.dao.getAllParts((data) => callback(data));
}
WorkerService.prototype.startAssemblingOrder = function(order, callback){
    this.dao.startAssemblingOrder(order, (data) => callback(data));
}

WorkerService.prototype.finishOrder = function(orderId, callback){
    this.dao.finishOrder(orderId, (data) => callback(data));
}
module.exports = WorkerService;