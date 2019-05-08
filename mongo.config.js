const env = process.env.NODE_ENV || 'dev';

const dev = {
    host:'mongodb://localhost',
    port:'27017',
    name:'webtech'
}

const config = {
    dev
}

module.exports = config[env];