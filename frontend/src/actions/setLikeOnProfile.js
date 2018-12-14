import axios from "axios";
import {GET_ERRORS, GET_LIKES,SHOW_MODAL} from './types';


export const setLike = (profileId) => dispatch => {
    axios.post(`/api/profiles/like`, {profileId})
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getLikes = () => dispatch => {
    axios.get(`/api/profiles?liked=true`)
        .then(res => {
            dispatch({
                type: GET_LIKES,
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

export const saveMatches = (profileId) => dispatch => {
    axios.post('/api/profiles/match', {profileId})
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const showModal = (name,gender)=> dispatch=>{
    dispatch({
        type: SHOW_MODAL,
        payload:true,
        name: name,
        gender:gender
    })
};

export const closeModal = ()=> dispatch=>{
    dispatch({
        type: SHOW_MODAL,
        payload:false
    })
};