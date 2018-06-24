import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getTrackDuration } from '../../helpers';

import { PlayerContainer } from '../player/playerContainer';
import { TwitterShare } from '../ui/shareButtons/twitterShare';
import { FacebookShare } from '../ui/shareButtons/facebookShare';

import './trackInfo.css';


export class TrackInfo extends React.Component {
    static propTypes = {
        loadTracks: PropTypes.func,
        tracks: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired,
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
        const { pathname } = this.props.history.location;

        let trackId = pathname.split('/');
        trackId = Number(trackId[trackId.length - 1]);

        return trackId;
    }

    getTrackById(id) {
        const { tracks } = this.props;
        const track = tracks.filter(item => item.trackId === id);

        return track[0];
    }

    render() {
        const trackId = this.getTrackId();
        const track = this.getTrackById(trackId);

        return (
            track ?
                <div>
                    <div className='backLink'>
                        <Link to='' onClick={this.props.history.goBack}>Назад</Link>
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
                </div>
                : null
        );
    }
}

