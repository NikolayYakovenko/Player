import {
    LOAD_TRACKS_START,
    LOAD_TRACKS_SUCCESS,
    LOAD_TRACKS_ERROR,
    TRACKS_SORT,
    ADD_TO_FAVOURITES,
    REMOVE_FROM_FAVOURITES,
} from '../../actions';

import {
    listReducers,
    DEFAULT_STATE,
    DEFAULT_FAVOURITES_STATE,
} from '../listReducers';

import { sortList } from '../../helpers';


describe('Test list reducers', () => {
    test('should return initial state', () => {
        expect(listReducers.list(undefined, {})).toEqual(DEFAULT_STATE);
    });

    test('should handle LOAD_TRACKS_START', () => {
        expect(listReducers.list([], {
            type: LOAD_TRACKS_START,
        })).toEqual({
            fetching: true,
        });
    });

    test('should handle LOAD_TRACKS_SUCCESS', () => {
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
        expect(listReducers.list([], {
            type: LOAD_TRACKS_SUCCESS,
            data: {
                results: tracks,
                resultCount: tracks.length,
            },
        })).toEqual({
            fetching: false,
            count: 2,
            tracks,
        });
    });

    test('should handle LOAD_TRACKS_ERROR', () => {
        expect(listReducers.list([], {
            type: LOAD_TRACKS_ERROR,
            data: 'An error occured',
        })).toEqual({
            fetching: false,
            errorMessage: 'An error occured',
        });
    });

    test('should handle TRACKS_SORT', () => {
        const tracks = [
            {
                artistName: 'Adele',
                trackName: 'Someone Like You',
                price: 1.25,
            },
            {
                artistName: 'Adele',
                trackName: 'Hello',
                price: 1.59,
            },
            {
                artistName: 'Adele',
                trackName: 'Test',
                price: 1.00,
            },
        ];
        const field = 'price';
        const isSorted = false;
        let sortableList = [].concat(tracks);
        sortableList = sortList(sortableList, field, isSorted);

        expect(listReducers.list({ tracks, isSorted }, {
            type: TRACKS_SORT,
            field,
        })).toEqual({
            tracks: sortableList,
            isSorted: !isSorted,
        });
    });
});


describe('Test favourites list reducers', () => {
    test('should return initial state', () => {
        expect(listReducers.favouritesList(undefined, {})).toEqual(DEFAULT_FAVOURITES_STATE);
    });

    test('should handle ADD_TO_FAVOURITES', () => {
        const track = {
            trackId: 1589312,
            artistName: 'Adele',
            trackName: 'Someone Like You',
            price: 1.25,
        };
        const initialState = {
            favourites: [
                {
                    trackId: 2342115,
                    artistName: 'Adele',
                    trackName: 'Test',
                    price: 1.85,
                },
            ],
            active: [2342115],
        };

        expect(listReducers.favouritesList(initialState, {
            type: ADD_TO_FAVOURITES,
            track,
        })).toEqual({
            favourites: [
                ...initialState.favourites,
                track,
            ],
            active: [
                ...initialState.active,
                track.trackId,
            ],
        });
    });

    test('should handle REMOVE_FROM_FAVOURITES', () => {
        const initialState = {
            favourites: [
                {
                    trackId: 2342115,
                    artistName: 'Adele',
                    trackName: 'Test',
                    price: 1.85,
                },
                {
                    trackId: 1122334,
                    artistName: 'Adele',
                    trackName: 'Someone Like You',
                    price: 1.44,
                },
            ],
            active: [2342115, 1122334],
        };
        const track = {
            trackId: 2342115,
            artistName: 'Adele',
            trackName: 'Test',
            price: 1.85,
        };
        const activeList = initialState.active.slice();
        const favList = initialState.favourites.slice();
        const trackIndex = activeList.indexOf(track.trackId);

        favList.splice(trackIndex, 1);
        activeList.splice(trackIndex, 1);

        expect(listReducers.favouritesList(initialState, {
            type: REMOVE_FROM_FAVOURITES,
            track,
        })).toEqual({
            favourites: favList,
            active: activeList,
        });
    });
});
