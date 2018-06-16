import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getTrackDuration } from '../../helpers';

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
                    <div className='logoWrapper'>
                        <img src={track.artworkUrl60} alt={track.trackName} />
                    </div>
                    <h2 className='trackName'>{track.trackName}</h2>
                    <div className='details'>
                        <p className='detailsLabel'>Artist:</p>
                        <p className='detailsInfo'>{track.artistName}</p>
                    </div>
                    <div className='details'>
                        <p className='detailsLabel'>Album:</p>
                        <p className='detailsInfo'>{track.collectionName}</p>
                    </div>
                    <div className='details'>
                        <p className='detailsLabel'>Duration:</p>
                        <p className='detailsInfo'>
                            {getTrackDuration(track.trackTimeMillis)}
                        </p>
                    </div>
                    <div className='details'>
                        <p className='detailsLabel'>Price:</p>
                        <p className='detailsInfo'>
                            <b>{track.trackPrice} </b>{track.currency}
                        </p>
                    </div>
                    <button className='controlButton'>But this track</button>
                    <button
                        className='controlButton'
                        onClick={() => this.playTrack(track.previewUrl)}
                    >
                        Play track
                    </button>
                    <div className='player'>
                        <audio tabIndex='0' id='beep' controls preload='auto'>
                            <track kind='captions' />
                            <source src={track.previewUrl} />
                        </audio>
                    </div>
                </div>
                : null
        );
    }
}

