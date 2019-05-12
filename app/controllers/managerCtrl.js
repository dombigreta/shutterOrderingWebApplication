const express = require('express');
const router = express.Router();

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
        res.send(result);
    })
})
module.exports = router;