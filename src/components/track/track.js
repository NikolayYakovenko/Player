import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getTrackDuration } from '../../helpers';

import './track.css';


export const Track = (props) => {
    const { trackInfo } = props;

    const getReleaseDate = (date) => {
        let a = Date.parse(date);
        a = new Date(a);
        return a.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <li className='track'>
            <div className='logoWrapper'>
                <img
                    className='trackLogo'
                    src={trackInfo.artworkUrl60}
                    alt={trackInfo.artistName}
                />
            </div>
            <div className='trackItem'>
                <Link className='trackName' to={`view/${trackInfo.trackId}`}>
                    <h3>{trackInfo.trackName}</h3>
                </Link>
                <div className='artistName'>
                    {trackInfo.artistName}
                </div>
                <div className='artistName'>
                    Album: {trackInfo.collectionName}
                </div>
                <div className='artistName'>
                    Release date: {getReleaseDate(trackInfo.releaseDate)}
                </div>
            </div>
            <div className='itemSmall'>
                Gengre:
                <br />
                {trackInfo.primaryGenreName}
            </div>
            <div className='itemSmall'>
                Duration:
                <br />
                {getTrackDuration(trackInfo.trackTimeMillis)}
            </div>
            <div className='itemSmall'>
                Price:
                <br />
                <b>{trackInfo.trackPrice}</b> {trackInfo.currency}
            </div>
        </li>
    );
};

Track.propTypes = {
    trackInfo: PropTypes.object.isRequired,
};
