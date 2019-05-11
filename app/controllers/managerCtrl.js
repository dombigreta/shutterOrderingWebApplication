const express = require('express');
const router = express.Router();

const srs = require('../services/managerService');
const service = new srs();

router.get('/', (req,res) => {
    service.getAllOrders((data) => {
        res.send(data);
    })
})

router.post('/getCustomerDataByCustomerId', (req,res) => {
    let customerId = req.body.customerId;
    service.getCustomerDataByCustomerId(customerId,(data) => {
        res.send(data);
    })
})

module.exports = router;