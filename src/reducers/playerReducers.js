import { sortList } from '../helpers/index';

import {
    LOAD_TRACKS_START,
    LOAD_TRACKS_SUCCESS,
    LOAD_TRACKS_ERROR,
    TRACKS_SORT,
    TRACK_PLAY,
    TRACK_PAUSE,
    TRACK_CHANGE,
} from '../actions';


const DEFAULT_STATE = {
    fetching: false,
    tracks: [],
    count: 0,
    isSorted: false,
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

// const trackReducer = (state = DEFAULT_STATE, action) => {
//     switch (action.type) {
//         case TRACK_PLAY:
//             return {
//                 ...state,
//                 track: action.data.results,
//             };
//         default:
//             return state;
//     }
// };


const playerReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case TRACK_PLAY:
            return {
                ...state,
                isPlaying: true,
            };
        case TRACK_PAUSE:
            return {
                ...state,
                isPlaying: false,
            };
        case TRACK_CHANGE:
            return {
                ...state,
                isPlaying: true,
                direction: action.direction,
            };
        default:
            return state;
    }
};


export const playerReducers = {
    list: listReducer,
    // track: trackReducer,
    player: playerReducer,
};
