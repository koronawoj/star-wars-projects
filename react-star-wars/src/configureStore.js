import {createStore, applyMiddleware} from 'redux';
import RootReducer from './reducers';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {fetchPeopleEpic, fetchPersonEpic} from './epics';
import {createEpicMiddleware, combineEpics} from 'redux-observable';
import {ajax} from 'rxjs/observable/dom/ajax';

const rootEpic = (...args) => combineEpics(
    fetchPeopleEpic,
    fetchPersonEpic
)(...args, {ajax});

const epicMiddleware = createEpicMiddleware(rootEpic);

export function configureStore() {
    const store = createStore(
        RootReducer,
        composeWithDevTools(applyMiddleware(epicMiddleware, thunk)),
    );
    return store;
}
