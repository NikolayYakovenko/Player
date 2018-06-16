import { SEARCH_URL } from '../config/api';
import { requestData } from '../helpers';

export const LOAD_TRACKS_START = 'LOAD_TRACKS_START';
export const LOAD_TRACKS_SUCCESS = 'LOAD_TRACKS_SUCCESS';
export const LOAD_TRACKS_ERROR = 'LOAD_TRACKS_ERROR';
export const PLAY_TRACK = 'PLAY_TRACK';


export const loadTracks = value => async (dispath) => {
    const url = `${SEARCH_URL}?term=${value}&limit=25`;

    dispath({
        type: LOAD_TRACKS_START,
    });

    try {
        const request = await requestData(url);
        dispath({
            type: LOAD_TRACKS_SUCCESS,
            data: request,
        });
    } catch (error) {
        dispath({
            type: LOAD_TRACKS_ERROR,
            data: error,
        });
    }
};


export const playerActions = {
    loadTracks,
};
