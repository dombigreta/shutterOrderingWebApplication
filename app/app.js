const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const mongoConnection  = require('./mongo.connection');

const customerCtrl = require('./controllers/customerCtrl');
const workerCtrl = require('./controllers/workerCtrl');
const managerCtrl = require('./controllers/managerCtrl');
const logger = require('./winston.config');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator());

mongoConnection.connectToServer((err) => {
    if(err) logger.debug(err);
    else{
        logger.info('successfully connected');
    }
})
let port = 9999;
app.use('/customer', customerCtrl);
app.use('/worker', workerCtrl);
app.use('/manager', managerCtrl);

app.listen(port,() => logger.info(`server is running on port ${port}`));
module.exports = app;