import {combineReducers} from 'redux';
import test from './reducer_test';
import loader from './reducer_loader';
import people from './reducer_people';
import person from './reducer_person';
import error from './reducer_error';
import films from './reducer_films';

const rootReducer = combineReducers({
    loader,
    people,
    test,
    person,
    error,
    films
});

export default rootReducer;

