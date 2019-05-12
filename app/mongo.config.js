const env = process.env.NODE_ENV || 'dev';

const dev = {
    host:'mongodb://172.21.0.10',
    port:'27017',
    name:'webtech'
}

const config = {
    dev
}

module.exports = config[env];