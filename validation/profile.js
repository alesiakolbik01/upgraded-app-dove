const Validator = require('validator');
const isEmpty = require('./is-empty');

const isReq = 'Is required';

module.exports = function validateRegisterInput(data) {
    const errors = {};
    data.age = !isEmpty(data.age) ? data.age : '';
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.search = !isEmpty(data.search) ? data.search : '';
    data.profession = !isEmpty(data.profession) ? data.profession : '';
    data.image = !isEmpty(data.image) ? data.image : '';

    if (data.age < 18 || data.age > 100) {
        errors.age = 'Min age - 18, max - 100';
    }

    if (Validator.isEmpty(data.age)) {
        errors.age = isReq;
    }
    if (Validator.isEmpty(data.gender)) {
        errors.gender = isReq;
    }
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = isReq;
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = isReq;
    }
    if (Validator.isEmpty(data.search)) {
        errors.search = isReq;
    }
    if (Validator.isEmpty(data.profession)) {
        errors.profession = isReq;
    }
    if (!Validator.isLength(data.profession, {min: 2, max: 30})) {
        errors.profession = 'Value must be between 2 to 30 chars';
    }
    if (!Validator.isLength(data.firstName, {min: 2, max: 30})) {
        errors.firstName = 'Value must be between 2 to 30 chars';
    }
    if (!Validator.isLength(data.lastName, {min: 2, max: 30})) {
        errors.lastName = 'Value must be between 2 to 30 chars';
    }
    if (!Validator.isAlpha(data.firstName, ['ru-RU'])) {
        errors.firstName = 'Value must have only RU letters (А-я)';
    }
    if (!Validator.isAlpha(data.lastName, ['ru-RU'])) {
        errors.lastName = 'Value must have only RU letters (А-я)';
    }
    if (data.age < 18 || data.age > 100) {
        errors.age = 'Age must be between 18 to 100';
    }
    if (data.image) {

        if (data.image.size >= 2000000) {
            errors.image = 'Size of photo should be till 2 mb';
        }
        if (data.image.mimetype !== 'image/jpeg') {
            errors.image = 'Type of photo should be JPEG';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
