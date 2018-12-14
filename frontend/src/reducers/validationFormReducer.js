import {FORM_IS_VALID} from "../actions/types";

const initialState = false;

export default function (state = initialState, action) {
    switch(action.type) {
        case FORM_IS_VALID:
            return action.payload;
        default:
            return state;
    }
}

