import * as ACTION_TYPES from '../constans/types';

let initialState = {
    peopleList: [],
    page: '',
    count: 0,
    error: '',
    activePage: 1,
    activePeople: [],
};

export default function (state = initialState, action) {
    switch(action.type){
        case ACTION_TYPES.SET_PEOPLE:
            return {
                ...state,
                // peopleList: action.payload.results,
                count: action.payload.count,
            }
        case ACTION_TYPES.SET_ALL_PEOPLE:
            return {
                ...state,
                peopleList: action.payload,
            }
        case ACTION_TYPES.GET_PEOPLE:
            return {
                ...state,
                activePage: action.payload
            }
        case ACTION_TYPES.ERROR:
            return {
                ...state,
                error: action.payload
            }
        case ACTION_TYPES.ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.payload
            }
        case ACTION_TYPES.SET_ACTIVE_PEOPLE:
            return {
                ...state,
                activePeople: action.payload
            }
        default:
            return state
    }
}

