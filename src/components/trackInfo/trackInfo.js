import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getTrackDuration } from '../../helpers';

import { PlayerContainer } from '../player/playerContainer';

import { Spinner } from '../ui/spinner/spinner';
import { TwitterShare } from '../ui/shareButtons/twitterShare';
import { FacebookShare } from '../ui/shareButtons/facebookShare';

import './trackInfo.css';


export class TrackInfo extends React.Component {
    static propTypes = {
        loadTracks: PropTypes.func,
        fetching: PropTypes.bool.isRequired,
        tracks: PropTypes.array.isRequired,
        match: PropTypes.object,
    };

    componentDidMount() {
        window.scrollTo(0, 0);

        const { tracks } = this.props;
        const trackId = this.getTrackId();

        if (!tracks.length) {
            this.props.loadTracks(trackId);
        }
    }

    getTrackId() {
        return Number(this.props.match.params.id);
    }

    getTrackById(id) {
        const { tracks } = this.props;
        const track = tracks.filter(item => item.trackId === id);

        return track[0];
    }

    renderTrackInfo() {
        const trackId = this.getTrackId();
        const track = this.getTrackById(trackId);

        return (
            track ?
                <React.Fragment>
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
                        {track.collectionName}
                    </div>
                    <div className='trackDetails'>
                        <b>Duration: </b>
                        {getTrackDuration(track.trackTimeMillis)}
                    </div>
                    <div className='trackDetails'>
                        <b>Price: </b>
                        {track.trackPrice > 0 ?
                            <span>
                                <b>{track.trackPrice} </b>{track.currency}
                            </span>
                            :
                            <span>Free</span>
                        }
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
                        <button className='controlButton'>
                            {track.trackPrice > 0 ?
                                <span>Buy this track</span>
                                :
                                <span>Add to favourite</span>
                            }
                        </button>
                    </div>
                    <PlayerContainer track={track} tracks={this.props.tracks} />
                    <div id='fb-root' />
                </React.Fragment>
                :
                this.noTrackFound()
        );
    }

    noTrackFound() {
        return (
            <React.Fragment>
                <h3>
                    There is no track with id <b>{this.props.match.params.id}</b>
                </h3>
                <Link to='/'>
                    Go to the main page
                </Link>
            </React.Fragment>
        );
    }

    render() {
        return (
            this.props.fetching ?
                <div className='spinnerWrapper'>
                    <Spinner />
                </div>
                :
                this.renderTrackInfo()
        );
    }
}

