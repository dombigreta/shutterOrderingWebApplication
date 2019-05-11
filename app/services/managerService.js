
function ManagerService(dataAccess){
    this.dao = dataAccess || require('../dao/managerDataAccess');
}

ManagerService.prototype.getAllOrders = function(callback){
    this.dao.getAllOrders((data) => callback(data))
}

ManagerService.prototype.getCustomerDataByCustomerId = function(customerId, callback){
    this.dao.getCustomerDataByCustomerId(customerId, (data) => callback(data));
}

module.exports = ManagerService;