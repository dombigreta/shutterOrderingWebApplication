
function CustomerService(dataccess){
    this.dao = dataccess || require('../dao/customerDataAccess') ;

}

CustomerService.prototype.viewOwnOrders = function(callback){
    this.dao.viewOwnOrders((data) => callback(data));
}

CustomerService.prototype.getShutterTypes = function(callback){
    this.dao.getShutterTypes((data) => callback(data));
}

CustomerService.prototype.getAllOwnOrders = function(){

}

CustomerService.prototype.createOrder = function(order,callback){

}

CustomerService.prototype.addWindowDetails = function(windowDetails,callback){
    this.dao.addWindowDetails(windowDetails,(result) => {
        callback(result);
    });

}


module.exports = CustomerService;

