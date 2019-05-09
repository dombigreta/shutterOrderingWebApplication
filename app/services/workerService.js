

function WorkerService(dataAccess){
    this.dao = dataAccess || require('../dao/workerDataAccess');
}

WorkerService.prototype.getAllOrders = function(callback){
    this.dao.getAllOrders((data) => callback(data));
}

module.exports = WorkerService;