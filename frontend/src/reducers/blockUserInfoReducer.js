import {
    GET_LIKES,
    GET_USER_PROFILE,
    GET_USERS_GALLERY,
    GET_USERS_LIST,
    SET_CHAT_ID,
    SET_MATCHES,
    SET_TAB_CHAT,
    UPDATE_USER_PROFILE
} from '../actions/types';

const initialState = {
    matches: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                blockUserInfo: 'userProfile',
                profile: action.payload.profile
            };
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                profile: action.payload.profile
            };
        case GET_USERS_LIST:
            return {
                ...state,
                blockUserInfo: 'messages',
                profiles: action.payload
            };
        case GET_USERS_GALLERY:
            return {
                ...state,
                blockUserInfo: 'usersGallery',
                profiles: action.payload
            };
        case GET_LIKES:
            return {
                ...state,
                blockUserInfo: 'userLikes',
                profiles: action.payload
            };
        case SET_MATCHES:
            return {
                ...state,
                blockUserInfo: 'messages',
                matches: action.payload
            };
        case SET_TAB_CHAT:
            return {
                ...state,
                blockUserInfo: 'messages',
                activeChat: action.chatId
            };
        case SET_CHAT_ID:
            const index = state.matches.findIndex(profile => {
                return profile.user === action.userId
            });
            const updateProfile = Object.assign({conversation: action.payload}, state.matches[index]);
            return {
                ...state,
                matches: [...state.matches.slice(0, index), updateProfile, ...state.matches.slice(index + 1)]
            };
        default:
            return state;
    }
};