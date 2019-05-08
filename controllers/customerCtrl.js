const express = require('express');
const router = express.Router();

const srs = require('../services/customerService');
const service = new srs();
const { check, validationResult } = require('express-validator/check')


router.get('/', (req,res) => {
    service.viewOwnOrders((data) => {
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

router.post('/addWindowDetails',[
    check('height', 'height should be filled').exists(),
    check('width', 'width should be filled').exists(),
    check('customerId','invalid customer id').exists(),
    check('shutterId','invalid shutter id').exists()
], (req,res) => {

    let errors = validationResult(req);
    if(errors.array().length > 0){
        res.status(400).send(errors.array());
    }

    let windowDetails = {
        height:req.body.height,
        width:req.body.width,
        orderId:req.body.orderId
    };

    service.addWindowDetails(windowDetails,(result) => {console.log(result)});
    res.status(200).send();
});

router.get('/getShutterTypes',(req,res) => {
    service.getShutterTypes((data) => {
        res.status(200).send(data)
    });
})

module.exports = router;