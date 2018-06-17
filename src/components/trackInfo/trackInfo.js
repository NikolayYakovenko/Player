import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getTrackDuration } from '../../helpers';

import { PlayerContainer } from '../player/playerContainer';

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

    async playTrack(url) {
        try {
            const audio = await new Audio(url);
            audio.play();

            setTimeout(() => {
                audio.pause();
            }, 2000);
        } catch (error) {
            console.error('error:', error);
        }
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
                    <div className='controlsWrapper'>
                        <button className='controlButton'>
                            {track.trackPrice > 0 ?
                                <span>Buy this track</span>
                                :
                                <span>Add to favourite</span>
                            }
                        </button>
                        <button
                            className='controlButton'
                            onClick={() => this.playTrack(track.previewUrl)}
                        >
                            Play track
                        </button>
                    </div>
                    <div className='player'>
                        <audio tabIndex='0' id='beep' controls preload='auto'>
                            <track kind='captions' />
                            <source src={track.previewUrl} />
                        </audio>
                    </div>
                    <PlayerContainer tracks={this.props.tracks} />
                </div>
                : null
        );
    }
}

