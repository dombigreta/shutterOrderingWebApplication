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

router.post('/createOrder',[
    check('customerId').isString(),
    check('dueDateOfAssembling').exists(),
    check('isInProgress').exists(),
    check('isDone').exists(),
    check('parts').isArray(),
    check('windows').isArray(),
], (req,res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty){
        res.send(errors);
    }
    let order = req.body;
    service.createOrder(order,(result) => {
            res.send({message:'the order was created', level:'info'});

    })
});

module.exports = router;