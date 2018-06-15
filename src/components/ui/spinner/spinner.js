import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import './spinner.css';

// Size enum
const LARGE = 'large';
const MEDIUM = 'medium';
const SMALL = 'small';
//

export function Spinner(props) {
    const { size = MEDIUM } = props;
    const classes = cs('default', size);

    return <div className={classes} />;
}

Spinner.defaultProps = {
    size: MEDIUM,
};

Spinner.propTypes = {
    size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
};
