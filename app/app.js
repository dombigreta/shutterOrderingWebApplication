const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const mongoConnection  = require('./mongo.connection');
const appRoot = require('app-root-path');
const path = require('path');

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

app.use('/customer', customerCtrl);
app.use('/worker', workerCtrl);
app.use('/manager', managerCtrl);

app.use(express.static(path.join(appRoot.path,'client/build'), {index:'index.html'}));
let port = 9999;
app.listen(port, () => logger.info(`app listents on ${port}`));