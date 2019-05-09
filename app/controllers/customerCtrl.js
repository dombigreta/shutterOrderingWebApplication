const express = require('express');
const router = express.Router();

const srs = require('../services/customerService');
const service = new srs();
const { check, validationResult } = require('express-validator/check')


router.post('/', (req,res) => {
    let customerId = req.body.customerId;
    service.viewOwnOrders(customerId,(data) => {
        res.status(200).send(data);
    })
});


router.get('/getShutterTypes',(req,res) => {
    service.getShutterTypes((data) => {
        res.status(200).send(data)
    });
})

router.post('/getCustomerData', (req,res) => {
    let customerId = req.body.customerId;

    service.getCustomerDataByCustomerId(customerId, (data) => {
        res.status(200).send(data);
    })
});

router.post('/createOrder', [
    check('customerId', 'invalid customer id').exists(),
    check('amount').exists()
                    .withMessage('amount should be filled')
                    .isInt()
                    .withMessage('invalid amount value')
], (req,res) => {
        let order = {
            customerId : req.body.customerId,
            date : Date.now,
            amount : req.body.amount
        }
});

module.exports = router;