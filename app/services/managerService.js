
function ManagerService(dataAccess){
    this.dao = dataAccess || require('../dao/managerDataAccess');
}

ManagerService.prototype.getAllOrders = function(callback){
    this.dao.getAllOrders((data) => callback(data))
}

ManagerService.prototype.getOrderById = function(orderId, callback){
    this.dao.getOrderById(orderId, (data) => callback(data));
}

ManagerService.prototype.getCustomerDataByCustomerId = function(customerId, callback){
    this.dao.getCustomerDataByCustomerId(customerId, (data) => callback(data));
}

ManagerService.prototype.getWorkersDataForInstallation = function(callback){
    this.dao.getWorkersDataForInstallation((data) => callback(data));
}

ManagerService.prototype.organiseInstallation = function(orderId, workerId, callback){
    this.dao.organiseInstallation(orderId,workerId, (data) => callback(data));
}

module.exports = ManagerService;