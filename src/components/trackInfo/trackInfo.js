import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getTrackDuration } from '../../helpers';

import { AddToFavouritesContainer } from '../addToFavourites/addToFavouritesContainer';
import { PlayButtonContainer } from '../playButton/playButtonContainer';

import { Spinner } from '../ui/spinner/spinner';
import { TwitterShare } from '../ui/shareButtons/twitterShare';
import { FacebookShare } from '../ui/shareButtons/facebookShare';

import './trackInfo.css';


export class TrackInfo extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);

        const { tracks, loadTracks, updateCurrentTrack } = this.props;
        const trackId = this.getTrackId();
        const track = this.getTrackById(trackId);

        if (!track || !tracks.length) {
            const promise = loadTracks(trackId);
            // update info about current track after tracks has loaded
            promise
                .then(
                    () => updateCurrentTrack(trackId),
                    (error) => { throw new Error(error); },
                );
        }
    }

    getTrackId() {
        const { match: { params } } = this.props;
        return params.id;
    }

    getTrackById(id) {
        const { tracks } = this.props;

        if (tracks && tracks.length) {
            const track = tracks.filter((item) => item.trackId === id.toString());

            return track[0];
        }

        return null;
    }

    searchTrackByAlbum = () => {
        const { loadTracksByAlbum, history } = this.props;
        const trackId = this.getTrackId();
        const track = this.getTrackById(trackId);

        loadTracksByAlbum(track.collectionId).then(
            () => history.push('/'),
            (error) => { throw new Error(error); },
        );
    };

    renderTrackInfo() {
        const trackId = this.getTrackId();
        const track = this.getTrackById(trackId);

        return (
            track
                ? (
                    <>
                        <div className='backLink'>
                            <Link to='/'>Back to the search</Link>
                        </div>
                        <div className='mainInfo'>
                            <div className='logoWrapper'>
                                <img
                                    className='trackLogo'
                                    src={track.artworkUrl60}
                                    alt={track.trackName}
                                />
                            </div>
                            <h2 className='trackName'>{track.trackName}</h2>
                        </div>
                        <div className='trackDetails'>
                            <b>Artist: </b>
                            {track.artistName}
                        </div>
                        <div className='trackDetails'>
                            <b>Album: </b>
                            <button
                                className='allAlbumSongButton'
                                onClick={this.searchTrackByAlbum}
                                title='See all songs from this album'
                                type='button'
                            >
                                {track.collectionName}
                            </button>
                        </div>
                        <div className='trackDetails'>
                            <b>Duration: </b>
                            {getTrackDuration(track.trackTimeMillis)}
                        </div>
                        <div className='trackDetails'>
                            <b>Price: </b>
                            {track.trackPrice > 0
                                ? (
                                    <span>
                                        <b>
                                            {track.trackPrice}
                                            {' '}
                                        </b>
                                        {track.currency}
                                    </span>
                                )
                                : <span>Free</span>}
                        </div>
                        <TwitterShare
                            text={`${track.artistName}: ${track.trackName} `}
                            hashtags={`${track.artistName},theBestMusicPlayer`}
                        />

                        {/* won't work with localhost */}
                        <FacebookShare
                            url='{window.location.href}'
                        />

                        <div className='controlsWrapper'>
                            {track.trackPrice > 0
                            && (
                                <button className='controlButton buyTrackButton' type='button'>
                                    Buy this track
                                </button>
                            )}
                            <div className='controlButton'>
                                <AddToFavouritesContainer track={track} />
                            </div>
                            <div className='controlButton'>
                                <PlayButtonContainer id={track.trackId} />
                            </div>
                        </div>

                        <div id='fb-root' />
                    </>
                )
                : this.noTrackFound()
        );
    }

    noTrackFound() {
        const { match: { params } } = this.props;
        return (
            <div className='noTrackFound'>
                <h3>
                    There is no track with id
                    {' '}
                    <b>{params.id}</b>
                </h3>
                <Link to='/'>
                    Go to the main page
                </Link>
            </div>
        );
    }

    render() {
        const { fetching, errorMessage } = this.props;

        if (fetching) {
            return (
                <div className='spinnerWrapper'>
                    <Spinner />
                </div>
            );
        } if (errorMessage) {
            return (
                errorMessage
            );
        }
        return (
            this.renderTrackInfo()
        );
    }
}

TrackInfo.propTypes = {
    loadTracks: PropTypes.func,
    loadTracksByAlbum: PropTypes.func,
    updateCurrentTrack: PropTypes.func,
    fetching: PropTypes.bool.isRequired,
    tracks: PropTypes.array.isRequired,
    errorMessage: PropTypes.string,
    match: PropTypes.object,
    history: PropTypes.object,
};
