import { ADD_MESSAGE, RECEIVE_MESSAGE, SET_CHAT_HISTORY, SEND_MESSAGES_SUCCESS, SEND_MESSAGES_FAIL,SET_USER_CONVERSATION}
from '../actions/types';

const initialState = {
    data: [],
    sent:false
};

export default function messages(state = initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            return {...state,
                data: [...state.data, action.message]
            };
        case SET_USER_CONVERSATION:
            return {...state,
                conversation: action.payload
            };
        case RECEIVE_MESSAGE:
            return {...state,
                data: [...state.data, action.message]
            };
        case SET_CHAT_HISTORY:
            const messages = action.payload.chat.reverse();
            return {...state,
                data: messages
            };
        case SEND_MESSAGES_SUCCESS:
            return {...state,
                message:action.payload
            };
        case SEND_MESSAGES_FAIL:
            return {...state,
                sent: false,
                error: action.error
            };
        default:
            return state;
    }
}