const express = require('express');
const router = express.Router();

const srs = require('../services/workerService');
const service = new srs();

router.post('/',(req,res) => {
    let workerId = req.body.workerId;
    service.getAllOrders(workerId,(data) => {
        res.send(data);
    })
});

router.get('/order/:orderId', (req,res) => {
    let orderId = req.params.orderId;
    service.getOrderById(orderId,(data) => {
        res.send(data);
    })
});

router.get('/getAllParts', (req,res) => {
    service.getAllParts((data) => {
        res.send(data);
    })
})

router.post('/finishOrder',(req,res) => {
    let orderId = req.body.orderId;
    service.finishOrder(orderId,(data) => {
        res.send(data);
    });
});

router.post('/startAssemblingOrder',(req,res) => {
    let order = req.body.order;
    service.startAssemblingOrder(order,(data) => {
        res.send(data);
    });
});

module.exports = router;