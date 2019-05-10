const express = require('express');
const router = express.Router();
const srs = require('../services/customerService');
const service = new srs();
const { check, validationResult } = require('express-validator/check')


router.post('/', (req,res) => {
    let customerId = req.body.customerId;
    service.viewOwnOrders(customerId,(data) => {
        res.send(data);
    })
});


router.get('/getShutterTypes',(req,res) => {
    service.getShutterTypes((data) => {
        res.send(data)
    });
})

router.post('/getCustomerData', (req,res) => {
    let customerId = req.body.customerId;

    service.getCustomerDataByCustomerId(customerId, (data) => {
        res.send(data);
    })
});

router.post('/createOrder', (req,res) => {
    let order = req.body;
    service.createOrder(order,(result) => {
            res.send(result);

    })
});

module.exports = router;