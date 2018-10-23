import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import { Howler } from 'howler';

import { API_SEARCH } from '../../config/api';

import {
    createPlaylist,
    loadTracks,
    makeSort,
    playTrack,
    pauseTrack,
    addToFavourites,
    removeFromFavourites,
    updateCurrentTrack,
    changeVolume,
    runTrack,
    CREATE_PLAYLIST,
    LOAD_TRACKS_START,
    LOAD_TRACKS_SUCCESS,
    LOAD_TRACKS_ERROR,
    TRACKS_SORT,
    TRACK_PLAY,
    TRACK_PAUSE,
    ADD_TO_FAVOURITES,
    REMOVE_FROM_FAVOURITES,
    UPDATE_CURRENT_TRACK,
    CHANGE_VOLUME_VALUE,
    RUN_TRACK,
} from '../index';


describe('Test async actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const url = `${API_SEARCH}?term=adele&limit=10`;

    test('should create an async action to load tracks', () => {
        const tracks = [
            {
                trackId: 420075185,
                artistName: 'Adele',
                collectionName: '21',
                trackName: 'Someone Like You',
            },
            {
                trackId: 1051394215,
                artistName: 'Adele',
                collectionName: '25',
                trackName: 'Hello',
            },
        ];
        const store = mockStore({ tracks: [] });
        const expectedActions = [
            { type: LOAD_TRACKS_START },
            {
                type: LOAD_TRACKS_SUCCESS,
                data: {
                    results: tracks,
                    resultCount: tracks.length,
                },
            },
            { type: CREATE_PLAYLIST, tracks },
        ];

        fetchMock.get(url, {
            body: { results: tracks, resultCount: tracks.length },
            status: 200,
            headers: { 'content-type': 'application/json' },
        });

        Howler._howls = ['a', 'b'];
        Howler.unload = jest.fn();
        if (Howler._howls.length) Howler.unload();

        expect.assertions(2);
        expect(Howler.unload).toBeCalled();
        store.dispatch(loadTracks('adele')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('async action loadTracks fails with error', () => {
        const store = mockStore({ tracks: [] });
        const expectedActions = [
            { type: LOAD_TRACKS_START },
            {
                type: LOAD_TRACKS_ERROR,
                data: 'Can\'t load tracks. Fetch error',
            },
        ];

        fetchMock.get(url, () => { throw new Error('error'); });

        Howler._howls = [];
        Howler.unload = jest.fn();
        if (Howler._howls.length) Howler.unload();

        expect.assertions(2);
        expect(Howler.unload).not.toBeCalled();
        store.dispatch(loadTracks('adele')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('Test actions', () => {
    test('should create an action to create playlist', () => {
        const tracks = [
            {
                trackId: 420075185,
                artistName: 'Adele',
                collectionName: '21',
                trackName: 'Someone Like You',
            },
            {
                trackId: 1051394215,
                artistName: 'Adele',
                collectionName: '25',
                trackName: 'Hello',
            },
        ];
        const expectedAction = {
            type: CREATE_PLAYLIST,
            tracks,
        };
        expect(createPlaylist(tracks)).toEqual(expectedAction);
    });

    test('should create an action to make sort', () => {
        const expectedAction = {
            type: TRACKS_SORT,
            field: 'primaryGenreName',
        };
        expect(makeSort('primaryGenreName')).toEqual(expectedAction);
    });

    test('should create an action to play track', () => {
        const expectedAction = {
            type: TRACK_PLAY,
        };
        expect(playTrack()).toEqual(expectedAction);
    });

    test('should create an action to pause track', () => {
        const trackId = 1051394215;
        const expectedAction = {
            type: TRACK_PAUSE,
            trackId,
        };
        expect(pauseTrack(trackId)).toEqual(expectedAction);
    });

    test('should create an action to add track to favourites', () => {
        const track = {
            trackId: 1051394215,
            artistName: 'Adele',
            collectionName: '25',
            trackName: 'Hello',
        };
        const expectedAction = {
            type: ADD_TO_FAVOURITES,
            track,
        };
        expect(addToFavourites(track)).toEqual(expectedAction);
    });

    test('should create an action to remove track from favourites', () => {
        const track = {
            trackId: 1051399215,
            artistName: 'Adele',
            collectionName: '25',
            trackName: 'Hello',
        };
        const expectedAction = {
            type: REMOVE_FROM_FAVOURITES,
            track,
        };
        expect(removeFromFavourites(track)).toEqual(expectedAction);
    });

    test('should create an action to update current track', () => {
        const trackId = 1051394515;
        const expectedAction = {
            type: UPDATE_CURRENT_TRACK,
            trackId,
        };
        expect(updateCurrentTrack(trackId)).toEqual(expectedAction);
    });

    test('should create an action to change volume', () => {
        const value = 0.85;
        const expectedAction = {
            type: CHANGE_VOLUME_VALUE,
            value,
        };
        expect(changeVolume(value)).toEqual(expectedAction);
    });

    test('should create an action to run track', () => {
        const trackId = 1054394215;
        const expectedAction = {
            type: RUN_TRACK,
            trackId,
        };
        expect(runTrack(trackId)).toEqual(expectedAction);
    });
});
