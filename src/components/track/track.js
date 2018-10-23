import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getTrackDuration } from '../../helpers';

import { AddToFavouritesContainer } from '../addToFavourites/addToFavouritesContainer';
import { PlayButtonContainer } from '../playButton/playButtonContainer';

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
                <div>
                    <AddToFavouritesContainer track={trackInfo} showOnHover />
                </div>
                <div>
                    <PlayButtonContainer id={trackInfo.trackId} />
                </div>
            </div>
            <div className='trackItem'>
                <Link className='trackName' to={`view/${trackInfo.trackId}`}>
                    <h3>{trackInfo.trackName}</h3>
                </Link>
                <div className='trackDetails'>
                    <b>Artist</b>: {trackInfo.artistName}
                </div>
                {trackInfo.collectionName ?
                    <div className='trackDetails'>
                        <b>Album</b>: {trackInfo.collectionName}
                    </div>
                    : null
                }
                <div className='trackDetails'>
                    <b>Release date</b>: {getReleaseDate(trackInfo.releaseDate)}
                </div>

                <div className='trackDetails trackDetailsShowOnSmall'>
                    <b>Genre</b>: {trackInfo.primaryGenreName}
                </div>
                <div className='trackDetails trackDetailsShowOnSmall'>
                    <b>Duration</b>: {getTrackDuration(trackInfo.trackTimeMillis)}
                </div>
                <div className='trackDetails trackDetailsShowOnSmall'>
                    <b>Price</b>:&nbsp;
                    {trackInfo.trackPrice > 0 ?
                        <span>
                            <b>{trackInfo.trackPrice}</b> {trackInfo.currency}
                        </span>
                        :
                        <b>Free</b>
                    }
                </div>
            </div>
            <div className='itemSmall itemHideOnSmall'>
                {trackInfo.primaryGenreName}
            </div>
            <div className='itemSmall itemHideOnSmall'>
                {getTrackDuration(trackInfo.trackTimeMillis)}
            </div>
            <div className='itemSmall itemHideOnSmall'>
                {trackInfo.trackPrice > 0 ?
                    <span>
                        <b>{trackInfo.trackPrice}</b> {trackInfo.currency}
                    </span>
                    :
                    <b>Free</b>
                }
            </div>
        </li>
    );
};

Track.propTypes = {
    trackInfo: PropTypes.object.isRequired,
};
