import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import blockUserInfoReducer from './blockUserInfoReducer';
import validationFormReducer from './validationFormReducer';
import messageReducer from './messageReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    blockUserInfo: blockUserInfoReducer,
    formIsValid: validationFormReducer,
    messages:messageReducer,
    modal:modalReducer
});