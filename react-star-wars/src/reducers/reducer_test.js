import * as ACTION_TYPES from '../constans/types';

let initialState = {
    test: 'Test!'
}

export default function (state = initialState, action) {
    switch(action.type){
        case ACTION_TYPES.TEST:
            return {...state, test: action.payload}
        default:
            return state
    }
}

