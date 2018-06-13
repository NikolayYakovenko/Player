import React from 'react';
import PropTypes from 'prop-types';

export const Track = (props) => {
    return (
        <li>{props.name}</li>
    );
};

Track.propTypes = {
    name: PropTypes.string.isRequired,
};
