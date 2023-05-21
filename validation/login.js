const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isLength(data.password, {min: 3, max: 30})) {
        errors.password = 'Password must have 3 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};