import React from 'react';
import PropTypes from 'prop-types';

import { getReleaseDate } from '../../helpers';

import './albumCover.css';


export const AlbumCover = (props) => {
    const { trackInfo } = props;

    return (
        <li className='albumCoverWrapper'>
            <h1 className='albumCoverTitle'>{trackInfo.collectionName}</h1>
            <h3>{trackInfo.artistName}</h3>
            <img
                className='albumCoverImg'
                src={trackInfo.artworkUrl100 || trackInfo.artworkUrl60}
                alt={`Cover of album ${trackInfo.collectionName}`}
            />
            <div className='albumCoverInfo'>
                <div className='trackDetails'>
                    <b>Release date</b>: {getReleaseDate(trackInfo.releaseDate)}
                </div>
                <div className='trackDetails'>
                    <b>Tracks count</b>: {trackInfo.trackCount}
                </div>
                <div className='trackDetails'>
                    <b>Genre</b>: {trackInfo.primaryGenreName}
                </div>
                <div className='trackDetails'>
                    <b>Collection price</b>: {trackInfo.collectionPrice} {trackInfo.currency}
                </div>
            </div>
        </li>
    );
};

AlbumCover.propTypes = {
    trackInfo: PropTypes.object.isRequired,
};
