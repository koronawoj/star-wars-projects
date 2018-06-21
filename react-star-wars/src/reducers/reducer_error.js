import * as ACTION_TYPES from '../constans/types';

let initialState = '';

export default function (state = initialState, action) {
    switch(action.type){
        case ACTION_TYPES.ERROR:
            return action.payload;
        default:
            return state
    }
}

