import { SEARCH_URL } from '../config/api';
import { requestData } from '../helpers';

export const LOAD_TRACKS_START = 'LOAD_TRACKS_START';
export const LOAD_TRACKS_SUCCESS = 'LOAD_TRACKS_SUCCESS';
export const LOAD_TRACKS_ERROR = 'LOAD_TRACKS_ERROR';

export const TRACKS_SORT = 'TRACKS_SORT';

export const TRACK_PLAY = 'TRACK_PLAY';
export const TRACK_PAUSE = 'TRACK_PAUSE';
export const TRACK_CHANGE = 'TRACK_CHANGE';

export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';


export const loadTracks = value => async (dispatch) => {
    const url = `${SEARCH_URL}?term=${value}&limit=10`;

    dispatch({
        type: LOAD_TRACKS_START,
    });

    try {
        const request = await requestData(url);
        dispatch({
            type: LOAD_TRACKS_SUCCESS,
            data: request,
        });
    } catch (error) {
        dispatch({
            type: LOAD_TRACKS_ERROR,
            data: 'Can\'t load tracks; Fetch error',
        });
    }
};

export const makeSort = (field) => {
    return {
        type: TRACKS_SORT,
        field,
    };
};

export const playTrack = () =>
    (dispatch) => {
        dispatch({
            type: TRACK_PLAY,
        });
    };

export const pauseTrack = () => {
    return {
        type: TRACK_PAUSE,
    };
};


export const changeTrack = (direction) => {
    return {
        type: TRACK_CHANGE,
        direction,
    };
};


export const addToFavourites = (track) => {
    return {
        type: ADD_TO_FAVOURITES,
        track,
    };
};

export const removeFromFavourites = (track) => {
    return {
        type: REMOVE_FROM_FAVOURITES,
        track,
    };
};

export const playerActions = {
    loadTracks,
    playTrack,
    pauseTrack,
    changeTrack,
    makeSort,
    addToFavourites,
    removeFromFavourites,
};
