const pdf = require('pdf-invoice-hu');
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

ManagerService.prototype.createInvoice = function(orderId, customerId, workerId, callback){
    gatherDataforInvoice(orderId,customerId,workerId,(order, customer, worker) => {
        
    })
}

function gatherDataforInvoice(orderId, customerId,workerId,callback){
    let order = null;
    let customer = null;
    let worker = null;
    this.dao.getOrderById(orderId, (data) => {
        order = data;
        this.dao.getCustomerDataByCustomerId(customerId, (data) => {
            customer = data;

            this.dao.getWorkerDataById(workerId, (data) => {
                worker = data;

                callback(order,customer,worker);
            })
        })
    })
}

module.exports = ManagerService;