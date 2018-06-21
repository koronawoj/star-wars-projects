import * as ACTION_TYPES from '../constans/types';

let initialState = {
    filmsList: [],
    error: '',
};

export default function (state = initialState, action) {
    switch(action.type){
        case ACTION_TYPES.SET_FILMS:
            return {
                ...state,
                filmsList: action.payload
            }

        case ACTION_TYPES.FILMS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

