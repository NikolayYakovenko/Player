import {
    TRACK_PAUSE,
    CREATE_PLAYLIST,
    UPDATE_CURRENT_TRACK,
    CHANGE_VOLUME_VALUE,
    RUN_TRACK,
} from '../actions';


const DEFAULT_STATE = {
    playlist: [], // array of tracks for player
    volumeValue: 1, // global volume value; from 0 to 1
    isPlaying: false, // temporary; will be deleted in the feature
    selectedTrackId: null, // the id of selected track;
    // used to display info about track in player
    currentTrack: {
        index: 0,
        id: null,
        title: '',
    },
};


const playerReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case TRACK_PAUSE:
            const playlist = state.playlist.map((track) => {
                if (track.id === action.trackId) {
                    return {
                        ...track,
                        isPlaying: false,
                    };
                }
                return track;
            });

            return {
                ...state,
                isPlaying: false,
                playlist,
            };
        case CREATE_PLAYLIST:
            const { tracks } = action;
            const listOfTracks = [];

            tracks.forEach((track) => {
                listOfTracks.push({
                    title: track.trackName,
                    file: track.previewUrl,
                    howl: null,
                    id: track.trackId,
                    isPlaying: false,
                });
            });

            return {
                ...state,
                playlist: listOfTracks,
            };
        case UPDATE_CURRENT_TRACK:
            const { trackId } = action;
            let currentTrack = {};

            state.playlist.forEach((track, index) => {
                if (track.id === trackId) {
                    currentTrack = {
                        index,
                        id: trackId,
                        title: track.title,
                    };
                }
            });
            return {
                ...state,
                currentTrack,
            };
        case CHANGE_VOLUME_VALUE:
            return {
                ...state,
                volumeValue: action.value,
            };
        case RUN_TRACK:
            const newTrackId = action.trackId;
            const list = state.playlist.map((track) => {
                if (track.id === newTrackId) {
                    // update isPlaying property for new track
                    return {
                        ...track,
                        isPlaying: true,

                    };
                } else if (track.isPlaying) {
                    // update isPlaying property for previous track
                    return {
                        ...track,
                        isPlaying: false,
                    };
                }
                return track;
            });

            return {
                ...state,
                selectedTrackId: newTrackId,
                playlist: list,
                isPlaying: true,
            };
        default:
            return state;
    }
};


export const playerReducers = {
    player: playerReducer,
};
