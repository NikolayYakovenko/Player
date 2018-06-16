import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getTrackDuration } from '../../helpers';

import './trackInfo.css';


export class TrackInfo extends React.Component {
    static propTypes = {
        tracks: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired,
    };

    state = {
        track: {},
    };

    componentDidMount() {
        window.scrollTo(0, 0);

        const { pathname } = this.props.history.location;

        let trackId = pathname.split('/');
        trackId = Number(trackId[trackId.length - 1]);

        const trackData = this.props.tracks.filter((item) => {
            return item.trackId === trackId;
        });

        this.setState({
            track: trackData[0],
        });
    }


    render() {
        const { track } = this.state;

        return (
            track ?
                <div>
                    <div className='backLink'>
                        <Link to='' onClick={this.props.history.goBack}>Назад</Link>
                    </div>
                    <div className='trackLogo'>
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
                    <p><b>{track.trackPrice} {track.currency}</b></p>
                    <button>But this track</button>
                </div>
                : null
        );
    }
}

