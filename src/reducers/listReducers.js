import { sortList } from '../helpers';

import {
    LOAD_TRACKS_START,
    LOAD_TRACKS_SUCCESS,
    LOAD_TRACKS_ERROR,
    TRACKS_SORT,
    ADD_TO_FAVOURITES,
    REMOVE_FROM_FAVOURITES,
} from '../actions';


const DEFAULT_STATE = {
    fetching: false,
    tracks: [],
    count: 0,
    isSorted: false,
};


const DEFAULT_FAVOURITES_STATE = {
    favourites: [],
    active: [],
};

const listReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case LOAD_TRACKS_START:
            return {
                ...state,
                fetching: true,
            };
        case LOAD_TRACKS_SUCCESS:
            return {
                ...state,
                fetching: false,
                tracks: action.data.results,
                count: action.data.resultCount,
            };
        case LOAD_TRACKS_ERROR:
            return {
                ...state,
                fetching: false,
                errorMessage: action.data,
            };
        case TRACKS_SORT:
            const { field } = action;
            let sortableList = [].concat(state.tracks);
            sortableList = sortList(sortableList, field, state.isSorted);

            return {
                ...state,
                tracks: sortableList,
                isSorted: !state.isSorted,
            };
        default:
            return state;
    }
};


const favouritesReducer = (state = DEFAULT_FAVOURITES_STATE, action) => {
    switch (action.type) {
        case ADD_TO_FAVOURITES:
            return {
                favourites: [
                    ...state.favourites,
                    action.track,
                ],
                active: [
                    ...state.active,
                    action.track.trackId,
                ],
            };
        case REMOVE_FROM_FAVOURITES:
            const { trackId } = action.track;
            const activeList = state.active.slice();
            const favList = state.favourites.slice();
            const trackIndex = activeList.indexOf(trackId);

            favList.splice(trackIndex, 1);
            activeList.splice(trackIndex, 1);

            return {
                ...state,
                favourites: favList,
                active: activeList,
            };
        default:
            return state;
    }
};

export const listReducers = {
    list: listReducer,
    favouritesList: favouritesReducer,
};
