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

router.get('/getAllParts', (req,res) => {

    service.getAllParts((data) => {
        res.send(data);
    })
})

module.exports = router;