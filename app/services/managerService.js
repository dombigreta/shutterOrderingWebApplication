const invoicePdf = require('pdf-invoice-hu');
const fs = require('fs');
const path = require('path');

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

ManagerService.prototype.gatherDataforInvoice =function(orderId, customerId,shutterId,callback){
    let order = null;
    let customer = null;
    let shutter = null;
    this.dao.getOrderById(orderId, (data) => {
        order = data;
        this.dao.getCustomerDataByCustomerId(customerId, (data) => {
            customer = data;
            this.dao.getShutterDataById(shutterId, (data) => {
                shutter = data;
                callback(order,customer,shutter);
            })
        })
    })
}


ManagerService.prototype.createInvoice = function(orderId, customerId, workerId, callback){
    this.gatherDataforInvoice(orderId,customerId,workerId,(order, customer, shutter) => {
        let pdf = invoicePdf({
            headline:{
                createdAt:new Date().toDateString(),
                completionDate: new Date(order.dueDateOfAssembling).toDateString(),
                paymentMethod:'Credit card',
                invoiceId:new Date(order.dueDateOfAssembling).toISOString()
            },
            seller: {
                phone: '+36 (30) 123-4567',
                email: 'shuttercreator@gmail.com',
                address: '1102 Budapest,redőny kr. 9.',
                name: 'Come to the darkside kft.',
              },
            buyer: {
                name: `${customer.lastName} ${customer.firstName}`,
                email:customer.email,
                address: `${customer.city} - ${customer.address}`
              },
            items:[{
                quantity: 1, 
                name: shutter.name, 
                unit_price: shutter.basePrice
            }]
        });
        pdf.generate();
        let currentDate = new Date().toISOString().replace(/\./g,'').replace(/\-/g,'').replace(/\:/g,'');
        const invoicesDir = 'invoices';
        if(!fs.existsSync(invoicesDir)){
            fs.mkdirSync(invoicesDir);
        }
        let fileName = `DarkSide_Invoicement_notification_${currentDate}.pdf`;

        pdf.pdfkitDoc.pipe(fs.createWriteStream(path.join('invoices',fileName)));
    })
}


module.exports = ManagerService;