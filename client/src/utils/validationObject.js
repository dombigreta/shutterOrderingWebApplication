import validator from 'validator'

class ValidationObject {
    constructor(validations){
        this.validations = validations;
    }
}

ValidationObject.prototype.validate = function(state){
    let validation = this.valid();

    this.validations.forEach(rule => {
        if(!validation[rule.field].isInvalid){
            const value = state[rule.field].toString();
            const args = rule.args || [];
            const method = typeof rule.method === String ? validator[rule.method] : rule.method;

            if(!method(value,...args, state) !== rule.validWhen){
                validation[rule.field] = {
                    isInvalid:true,
                    message:rule.message
                }
                validation.isValid = false
            }
        }
    });
    return validation;
}

ValidationObject.prototype.valid = function(state){
    const validation = {};
    this.validations.map(rule => {
        validation[rule.field] = {isInvalid:false, message:''}
    });

    return {isValid:true, ...validation};
}


export default ValidationObject;