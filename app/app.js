const express = require('express');
const expressValidator = require('express-validator');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoConnection  = require('./mongo.connection');

const customerCtrl = require('./controllers/customerCtrl');
const workerCtrl = require('./controllers/workerCtrl');
const managerCtrl = require('./controllers/managerCtrl');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator());

mongoConnection.connectToServer((err) => {
    if(err) console.log(err);
    else{
        console.log('successfully connected');
    }
})

app.use('/customer', customerCtrl);
app.use('/worker', workerCtrl);
app.use('/manager', managerCtrl);

app.listen(9999,() => console.log('server is running'));

module.exports = app;