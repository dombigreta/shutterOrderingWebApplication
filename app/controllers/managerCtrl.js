const express = require('express');
const router = express.Router();
const appRoot = require('app-root-path');
const fs = require('fs');

const srs = require('../services/managerService');
const service = new srs();

router.get('/', (req,res) => {
    service.getAllOrders((data) => {
        res.send(data);
    })
});

router.get('/order/:orderId', (req,res) => {
    let orderId = req.params.orderId;
    service.getOrderById(orderId,(data) => {
        res.send(data);
    })
});

router.post('/getCustomerDataByCustomerId', (req,res) => {
    let customerId = req.body.customerId;
    service.getCustomerDataByCustomerId(customerId,(data) => {
        res.send(data);
    })
});


router.get('/getWorkersDataForInstallation', (req,res) => {

    service.getWorkersDataForInstallation((data) => {
        res.send(data);
    })
})

router.post('/organiseInstallation',(req,res) => {
    let orderId = req.body.orderId;
    let workerId = req.body.workerId;
    service.organiseInstallation(orderId, workerId, (result) => {
        res.send({message:'the invoice was created', level:'info'});
    })
});


router.post('/createInvoice',(req,res) => {
    let orderId = req.body.orderId;
    let customerId = req.body.customerId;

    service.createInvoice(orderId,customerId, (fileName) => {
      let file = appRoot.path + '/app/invoices/' + fileName;
      console.log(file);
      if(!fs.existsSync(file)){
        res.send({error:'the file is not found', level:'error'});
      }
      res.send({message:'the invoice was created', level:'info'}); 
    })
})

router.get('/getStatistics', (req,res) => {
    service.getStatistics((data) => {
        res.send(data);
    })
});

router.get('/getShuttersDataForStatistics', (req,res) => {
    service.getShuttersDataForStatistics((data) => {
        res.send(data);
    })
})

module.exports = router;