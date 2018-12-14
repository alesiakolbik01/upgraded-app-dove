import { SHOW_MODAL } from '../actions/types';

const initialState = {
    isModal:false,
    name:'',
    gender:''
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isModal:action.payload,
                name:action.name,
                gender:action.gender
            };
        default:
            return state;
    }
};