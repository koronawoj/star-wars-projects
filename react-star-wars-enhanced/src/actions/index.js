import * as ACTION_TYPES from '../constans/types'
import axios from 'axios';
import {Observable} from "rxjs/Rx";

export function test() {
    return {
        type: ACTION_TYPES.TEST,
        payload: 'Test!!!!!!!!!!!'
    }
}

export const loaderLinear = (loading) => {
    return {
        type: ACTION_TYPES.LOADING_LINEAR,
        payload: loading
    }
}

export const setActivePeople = (people) => {
    return {
        type: ACTION_TYPES.SET_ACTIVE_PEOPLE,
        payload: people
    }
}

export const changePage = (page) => {
    return {
        type: ACTION_TYPES.ACTIVE_PAGE,
        payload: page
    }
}

export const loaderSpinner = (loading) => {
    return {
        type: ACTION_TYPES.LOADING_SPINNER,
        payload: loading
    }
}

export const fetchDone = (done) => {
    return {
        type: ACTION_TYPES.FETCH_DONE,
        payload: done
    }
}

export const apiCallError = (err) => {
    return {
        type: ACTION_TYPES.ERROR,
        payload: err.message
    }
}

export const fetchPeople = (id) => {
    return {
        type: ACTION_TYPES.GET_PEOPLE,
        payload: id
    }
}

export const fetchPeopleFulfilledAction = (people) => {
    return {
        type: ACTION_TYPES.SET_PEOPLE,
        payload: people
    }
}

export const fetchAllPeople = (count) => {
    return {
        type: ACTION_TYPES.GET_ALL_PEOPLE,
        payload: count
    }
}

export const fetchAllPeopleFulfilledAction = (people) => {
    return {
        type: ACTION_TYPES.SET_ALL_PEOPLE,
        payload: people
    }
}

export const fetchPerson = (id) => {
    return {
        type: ACTION_TYPES.GET_PERSON,
        payload: id
    }
}

export const fetchPersonFulfilledAction = (person) => {
    return {
        type: ACTION_TYPES.SET_PERSON,
        payload: person
    }
}

export const fetchFilms = () => async dispatch => {
    function onSuccess(success) {
        let films = success.data.results.map(elem => ({
            title: elem.title,
            id: elem.url.match(/[0-9]+/g)[0]
        }))
        dispatch({type: ACTION_TYPES.SET_FILMS, payload: films});
    }

    function onError(error) {
        dispatch({type: ACTION_TYPES.FILMS_ERROR, payload: error});
        return error;
    }

    try {
        const success = await axios.get(`https://swapi.co/api/films`);
        return onSuccess(success);
    } catch (error) {
        return onError('Unable to connect to server.');
    }
}