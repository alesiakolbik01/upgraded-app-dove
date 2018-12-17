import axios from "axios";
import {
    ADD_MESSAGE,
    GET_ERRORS,
    RECEIVE_MESSAGE,
    SEND_MESSAGES_FAIL,
    SEND_MESSAGES_SUCCESS,
    SET_CHAT_HISTORY,
    SET_CHAT_ID,
    SET_TAB_CHAT,
    SET_USER_CONVERSATION
} from './types';

export const createNewChat = (userId) => dispatch => {
    axios.post(`/api/chat/new/${userId}`)
        .then(res => {
                dispatch({
                    type: SET_CHAT_ID,
                    payload: res.data.chat._id,
                    userId: userId
                });
            dispatch({
                type: SET_TAB_CHAT,
                chatId: res.data.chat._id,
            });
            }
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};
export const sendMessage = (chatId, message) => dispatch => {
    axios.post(`/api/chat/${chatId}`, {message})
        .then(res => {
                dispatch({
                    type: SEND_MESSAGES_SUCCESS,
                    payload: res.data.message
                });
            }
        )
        .catch(err => {
            dispatch({
                type: SEND_MESSAGES_FAIL,
                error: err.response.data
            })
        });
};
export const clearMessage = () => dispatch => {
    dispatch({
        type: SEND_MESSAGES_SUCCESS,
        payload: null
    });
};

export const getChatHistory = (chatID) => dispatch => {
  axios.get(`/api/chat/${chatID}`)
        .then(res => {
                dispatch({
                    type: SET_CHAT_HISTORY,
                    payload: res.data.chat,
                    chatId:chatID
                });
            }
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

export const openChat = (chatID) => dispatch => {
    dispatch({
        type: SET_TAB_CHAT,
        chatId: chatID
    });
};

export const addMessage = (message) => dispatch => {
    dispatch({
        type: ADD_MESSAGE,
        message
    });
};

export const receiveRawMessage = (message) => dispatch => {
    dispatch({
        type: RECEIVE_MESSAGE,
        message
    });
};

export const getUserConversations = () => dispatch => {
    axios.get(`/api/chat/`)
        .then(res => {
                dispatch({
                    type: SET_USER_CONVERSATION,
                    payload: res.data
                });
            }
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};


