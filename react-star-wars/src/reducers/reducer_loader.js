import * as ACTION_TYPES from '../constans/types';

let initialState = {
    linearLoader: false,
    loadingSpinner: false,
    fetchDone: false,
};

export default function (state = initialState, action) {
    switch(action.type){
        case ACTION_TYPES.LOADING_LINEAR:
            return {...state, linearLoader: action.payload};
        case ACTION_TYPES.LOADING_SPINNER:
            return {...state, loadingSpinner: action.payload};
        case ACTION_TYPES.FETCH_DONE:
            return {...state, fetchDone: action.payload};
        default:
            return state
    }
}

