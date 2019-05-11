

function WorkerService(dataAccess){
    this.dao = dataAccess || require('../dao/workerDataAccess');
}

WorkerService.prototype.getAllOrders = function(workerId, callback){
    this.dao.getAllOrders(workerId, (data) => callback(data));
}

WorkerService.prototype.getAllParts = function(callback){
    this.dao.getAllParts((data) => callback(data));
}

module.exports = WorkerService;