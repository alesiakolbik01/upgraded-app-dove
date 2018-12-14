import { SOCKET } from '../actions/types';

export default function reducer(state = {}, action) {
    switch(action.type) {
        case SOCKET:
            return action.payload;

        default:
            return state
    }
}