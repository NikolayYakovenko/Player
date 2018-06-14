import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const TrackInfo = (props) => {
    const tracks = [
        {
            name: 'first',
            id: 1,
        },
        {
            name: 'second',
            id: 2,
        },
        {
            name: 'third',
            id: 3,
        },
        {
            name: 'fourth',
            id: 4,
        },
    ];

    const getTrack = () => {
        const { pathname } = props.history.location;
        const trackId = parseInt(pathname.charAt(pathname.length - 1), 10);
        return trackId - 1;
    };

    return (
        <div>
            <div>
                <Link to='' onClick={props.history.goBack}>Назад</Link>
            </div>
            <div>
                logo
            </div>
            {tracks[getTrack()].name}
            {tracks[getTrack()].id}
            <button>Hello</button>
        </div>
    );
};

TrackInfo.propTypes = {
    // name: PropTypes.string.isRequired,
    // trackId: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
};
