
function CustomerService(dataAccess){
    this.dao = dataAccess || require('../dao/customerDataAccess') ;

}

CustomerService.prototype.viewOwnOrders = function(customerId,callback){
    this.dao.viewOwnOrders(customerId,(data) => callback(data));
}

CustomerService.prototype.getShutterTypes = function(callback){
    this.dao.getShutterTypes((data) => callback(data));
}

CustomerService.prototype.createOrder = function(order,callback){
    this.dao.createOrder(order,(result) => callback(result));
}

CustomerService.prototype.getCustomerDataByCustomerId = function(customerId, callback){
    this.dao.getCustomerDataByCustomerId(customerId,(data) => callback(data));
}

module.exports = CustomerService;

