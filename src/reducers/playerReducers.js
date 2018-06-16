import {
    LOAD_TRACKS_START,
    LOAD_TRACKS_SUCCESS,
    LOAD_TRACKS_ERROR,
    PLAY_TRACK,
} from '../actions';


const DEFAULT_STATE = {
    fetching: false,
    tracks: [],
    count: 0,
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
        default:
            return state;
    }
};

const trackReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case PLAY_TRACK:
            return {
                ...state,
                track: action.data.results,
            };
        default:
            return state;
    }
};


export const playerReducers = {
    list: listReducer,
    track: trackReducer,
};
