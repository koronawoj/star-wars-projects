import * as ACTION_TYPES from '../constans/types';

let initialState = {
    personObj: {},
    error: '',
    id: 1,
};

export default function (state = initialState, action) {
    switch(action.type){
        case ACTION_TYPES.SET_PERSON:
            return {
                ...state,
                personObj: action.payload
            }
        case ACTION_TYPES.GET_PERSON:
            return {
                ...state,
                id: action.payload
            }
        case ACTION_TYPES.ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

