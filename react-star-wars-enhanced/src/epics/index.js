import {Observable} from 'rxjs';
import * as ACTION_TYPES from "../constans/types";
import {
    fetchPeopleFulfilledAction,
    loaderLinear,
    loaderSpinner,
    apiCallError,
    fetchPersonFulfilledAction,
    fetchDone,
    fetchAllPeopleFulfilledAction
} from '../actions'

export const fetchPeopleEpic = (action$) => {
    return action$
        .ofType(ACTION_TYPES.GET_PEOPLE)
        // .debounceTime(500)
        .switchMap(({payload}) => {
            const blockers = Observable.merge(
                action$.ofType(ACTION_TYPES.CANCEL_SEARCH)
            );
            const loaderSpinnerTrue = Observable.of(loaderSpinner(true));
            const loaderSpinnerFalse = Observable.of(loaderSpinner(false));

            const request = Observable.ajax({
                method: 'GET',
                url: `https://swapi.co/api/people/?page=${payload}`,
                crossDomain: true,
            })
                .takeUntil(blockers)
                .map(res => {
                    return fetchPeopleFulfilledAction(res.response)
                })
                .catch(() => {
                    return Observable.of(apiCallError(new Error('Oops Something went wrong. We\'re working on getting this fixed as soon as we can.')));
                });

            return Observable.concat(
                loaderSpinnerTrue,
                request,
                loaderSpinnerFalse,
            )
        })
};

export const fetchPersonEpic = (action$) => {
    return action$
        .ofType(ACTION_TYPES.GET_PERSON)
        // .debounceTime(500)
        .switchMap(({payload}) => {
            const blockers = Observable.merge(
                action$.ofType(ACTION_TYPES.CANCEL_SEARCH),
                action$.ofType(ACTION_TYPES.ERROR)
            );
            const loaderLinearTrue = Observable.of(loaderLinear(true));
            const loaderLinearFalse = Observable.of(loaderLinear(false));
            const fetchDoneTrue = Observable.of(fetchDone(true));
            const request = Observable.ajax({
                method: 'GET',
                url: `https://swapi.co/api/people/${payload}`,
                crossDomain: true,
            })
                .takeUntil(blockers)
                .map(res => {
                    return fetchPersonFulfilledAction(res.response)
                })
                .catch((error) => {
                    return Observable.of(apiCallError(new Error('Oops Something went wrong. We\'re working on getting this fixed as soon as we can.')));
                });

            return Observable.concat(
                loaderLinearTrue,
                request,
                loaderLinearFalse,
                fetchDoneTrue
            )
        })
};

export const fetchAllPeopleEpic = (action$) => {
    return action$
        .ofType(ACTION_TYPES.GET_ALL_PEOPLE)
        .switchMap(({payload}) => {
            payload = new Array(payload).fill().map((v, i) => i + 1);

            const loaderLinearFalse = Observable.of(loaderLinear(false));
            const test = Observable.forkJoin(
                payload.map(id => {
                    return Observable.ajax({
                        method: 'GET',
                        url: `https://swapi.co/api/people/?page=${id}`,
                        crossDomain: true,
                    })
                }))
                .map(res => {
                    return res.map(elem => {
                        return elem.response.results
                    });
                })
                .map(res => {
                    return res.reduce((acc, val) => acc.concat(val), [])
                })
                .map(res => {
                    return fetchAllPeopleFulfilledAction(res)
                })

            return Observable.concat(
                test,
                loaderLinearFalse
            )
        })
};