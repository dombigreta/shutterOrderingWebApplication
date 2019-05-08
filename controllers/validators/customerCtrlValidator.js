const { body } = require('express-validator/check');

module.exports.validator = (func) => {
    console.log(func);
    switch(func){
        case 'addWindowDetails':{
            return [
                body('height','the height field must be filled').exists(),
                body('width', 'width must be filled').exists(),
                body('customerId'),
                body('shutterId')
            ]
        }
    }
}