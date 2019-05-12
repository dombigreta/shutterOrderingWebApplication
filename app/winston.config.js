
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const logDir = 'log';

if(!fs.existsSync(logDir)){
  fs.mkdirSync(logDir);
}

const fileName = path.join(__dirname,logDir,'loginfo.log');

const logger = createLogger({
  level: 'debug',
  format: format.combine(format.colorize(),
                          format.simple(),
                          format.timestamp({
                            format:'YYYY-MM-DD HH:mm:ss'
                          }),
                          format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
  transports: [new transports.Console(), new transports.File({filename:fileName})]
});

module.exports = logger;