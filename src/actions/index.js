import { Howler } from 'howler';

import { API_SEARCH, API_LOOKUP } from '../config/api';
import { requestData } from '../helpers';

export const LOAD_TRACKS_START = 'LOAD_TRACKS_START';
export const LOAD_TRACKS_SUCCESS = 'LOAD_TRACKS_SUCCESS';
export const LOAD_TRACKS_ERROR = 'LOAD_TRACKS_ERROR';

export const TRACKS_SORT = 'TRACKS_SORT';

export const TRACK_PLAY = 'TRACK_PLAY';
export const TRACK_PAUSE = 'TRACK_PAUSE';

export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';

export const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
export const UPDATE_CURRENT_TRACK = 'UPDATE_CURRENT_TRACK';
export const CHANGE_VOLUME_VALUE = 'CHANGE_VOLUME_VALUE';
export const RUN_TRACK = 'RUN_TRACK';


export const createPlaylist = (tracks) => {
    return {
        type: CREATE_PLAYLIST,
        tracks,
    };
};

export const searchTracks = url => async (dispatch) => {
    dispatch({
        type: LOAD_TRACKS_START,
    });

    // destroy Howler object when user search another songs
    if (Howler._howls.length) Howler.unload();

    try {
        const request = await requestData(url);

        dispatch({
            type: LOAD_TRACKS_SUCCESS,
            data: request,
        });

        dispatch(createPlaylist(request.results));
    } catch (error) {
        dispatch({
            type: LOAD_TRACKS_ERROR,
            data: 'Can\'t load tracks. Fetch error',
        });
    }
};

export const loadTracks = value => async (dispatch) => {
    const url = `${API_SEARCH}?term=${value}`;

    dispatch(searchTracks(url));
};

export const loadTracksByAlbum = albumId => async (dispatch) => {
    const url = `${API_LOOKUP}?id=${albumId}`;

    dispatch(searchTracks(url));
};

export const makeSort = (field) => {
    return {
        type: TRACKS_SORT,
        field,
    };
};

export const playTrack = () => {
    return {
        type: TRACK_PLAY,
    };
};

export const pauseTrack = (trackId) => {
    return {
        type: TRACK_PAUSE,
        trackId,
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

export const updateCurrentTrack = (trackId) => {
    return {
        type: UPDATE_CURRENT_TRACK,
        trackId,
    };
};


export const changeVolume = (value) => {
    return {
        type: CHANGE_VOLUME_VALUE,
        value,
    };
};

export const runTrack = (trackId) => {
    return {
        type: RUN_TRACK,
        trackId,
    };
};


export const playerActions = {
    loadTracks,
    loadTracksByAlbum,
    playTrack,
    pauseTrack,
    makeSort,
    addToFavourites,
    removeFromFavourites,
    createPlaylist,
    updateCurrentTrack,
    changeVolume,
    runTrack,
};
