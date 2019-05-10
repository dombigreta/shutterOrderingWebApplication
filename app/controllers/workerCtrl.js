const express = require('express');
const router = express.Router();

const srs = require('../services/workerService');
const service = new srs();

router.get('/',(req,res) => {
    service.getAllOrders((data) => {
        res.send(data);
    })
});

module.exports = router;