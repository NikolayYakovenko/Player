import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './track.css';


export const Track = (props) => {
    const { trackInfo } = props;
    return (
        <li className='track'>
            <img
                className='trackLogo'
                src={trackInfo.artworkUrl30}
                alt={trackInfo.artistName}
            />
            <Link className='trackName' to={`view/${trackInfo.trackId}`}>
                {trackInfo.trackName}
            </Link>
            <div className='artistName'>
                {trackInfo.artistName}
            </div>
        </li>
    );
};

Track.propTypes = {
    trackInfo: PropTypes.object.isRequired,
};
