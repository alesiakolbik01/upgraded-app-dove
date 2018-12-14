import axios from "axios";
import {
    FORM_IS_VALID,
    GET_ERRORS,
    SET_MATCHES,
    GET_USER_PROFILE,
    GET_USERS_GALLERY,
    UPDATE_USER_PROFILE
} from "./types";


export const updateUserProfile = (id, formData) => dispatch => {
    axios.put(`/api/profiles/${id}`, formData)
        .then(res => {
            dispatch({
                type: UPDATE_USER_PROFILE,
                payload: res.data
            });
            dispatch({
                type: FORM_IS_VALID,
                payload: true
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch({
                type: FORM_IS_VALID,
                payload: false
            });
        });
};

export const getUserProfile = (userId) => (dispatch) => {
    axios.get(`/api/profiles/${userId}`)
        .then(res => {
            dispatch({
                type: GET_USER_PROFILE,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getUsersList = () => (dispatch) => {
    axios.get(`/api/profiles?matched=true`)
        .then(res => {
            dispatch({
                type: SET_MATCHES,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};


export const getUsersGallery = () => (dispatch) => {
    axios.get('/api/profiles')
        .then(res => {
            dispatch({
                type: GET_USERS_GALLERY,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
