const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    const errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';
    data.file = !isEmpty(data.file) ? data.file : '';
    data.age = !isEmpty(data.age) ? data.age : '';

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 to 30 chars';
    }
    if(!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = 'Value must be between 2 to 30 chars';
    }
    if(!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = 'Value must be between 2 to 30 chars';
    }
    if(!Validator.isAlpha(data.firstName, ['ru-RU'])) {
        errors.firstName = 'Value must have only RU letters (А-я)';
    }
    if(!Validator.isAlpha(data.lastName, ['ru-RU'])) {
        errors.lastName = 'Value must have only RU letters (А-я)';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name field is required';
    }
    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name field is required';
    }
    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
        errors.password_confirm = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }
    if(data.age < 18 || data.age > 100) {
        errors.age = 'Age must be between 18 to 100';
    }

    if(!data.file) {
        errors.image = 'Photo is required';
    }
    if(data.file.size >= 2000000) {
        errors.image = 'Size of photo should be till 2 mb';
    }
    if(data.file.mimetype !== 'image/jpeg') {
        errors.image = 'Type of photo should be JPEG';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
