const invoicePdf = require('pdf-invoice-hu');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');


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

ManagerService.prototype.gatherDataforInvoice =function(orderId, customerId,callback){
    let order = null;
    let customer = null;
    let shutters = [];
    this.dao.getOrderById(orderId, (data) => {
        order = data;
        this.dao.getCustomerDataByCustomerId(customerId, (data) => {
            customer = data;
               this.dao.getShutterDataByIds(order.windows,(data) => {
                   shutters = data;
                callback(order,customer,shutters);
               })
        })
    })
}


ManagerService.prototype.createInvoice = function(orderId, customerId, callback){

    this.gatherDataforInvoice(orderId,customerId,(order, customer, shutters) => {
        let seller = {
            phone: '+36 (30) 123-4567',
            email: 'shuttercreator@gmail.com',
            address: '1102 Budapest,redőny kr. 9.',
           name: 'Come to the darkside kft.',
         }

         let buyer = {
            name: `${customer.lastName} ${customer.firstName}`,
            email:customer.email,
            address: `${customer.city} - ${customer.address}`
          }

            let paymentDeadline = new Date(order.dueDateOfAssembling);
            paymentDeadline.setDate(paymentDeadline.getDate() + 30);

          let headline = {
            createdAt:new Date().toDateString(),
            completionDate: new Date(order.dueDateOfAssembling).toDateString(),
            paymentMethod:'Credit card',
            invoiceId:new Date(order.dueDateOfAssembling).toISOString(),
            paymentDeadline:paymentDeadline
        }

        let items = shutters.map(shutter => ({quantity:1,name:shutter.name, unit_price:shutter.basePrice, net_price:shutter.basePrice * 0.75, vat_amount:shutter.basePrice*0.25}));

        let pdf = invoicePdf({
            headline:headline,
                 seller: seller,
                 buyer: buyer,
                 items:items
             });
             pdf.generate();
             let currentDate = new Date().toISOString().replace(/\./g,'').replace(/\-/g,'').replace(/\:/g,'');
             const invoicesDir = 'invoices';
             if(!fs.existsSync(invoicesDir)){
                fs.mkdirSync(invoicesDir);
             }
             let fileName = `DarkSide_Invoicement_notification_${currentDate}.pdf`;
    
            pdf.pdfkitDoc.pipe(fs.createWriteStream(path.join(appRoot.path,'app', 'invoices',fileName)));
            this.dao.closeOrder(order._id, (data) =>{
                
            });
            callback(fileName);
})}

ManagerService.prototype.getStatistics = function(callback){
    
    this.dao.getAllOrders((data) => {

        let overalRevenue = 0;
        let countOfFinishedOrders = 0;
        let countOfNotAssembledOrders = 0;
        let countOfAssemblingOrders = 0;
        let countOfOrderedShutters = 0;

        data.forEach(order => {
            overalRevenue += order.price;
            if(order.isDone){
                countOfFinishedOrders++;
            }
            else if(order.isInProgess || order.workerId != null){
                countOfAssemblingOrders++;
            }
            else{
                countOfNotAssembledOrders++;
            }

            countOfOrderedShutters += order.windows.length;
        });

        let stat = {
            overalRevenue,
            countOfFinishedOrders,
            countOfNotAssembledOrders,
            countOfAssemblingOrders,
            countOfOrderedShutters,
            currency:'HUF'
        };
        callback(stat);
    })
}
module.exports = ManagerService;