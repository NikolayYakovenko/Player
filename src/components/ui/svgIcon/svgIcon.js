import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import './svgIcon.css';


export const SvgIcon = ({ glyph, className }) => {
    const classes = cs('root', className);

    return (
        <svg className={classes} viewBox={glyph.viewBox}>
            <use xlinkHref={`#${glyph.id}`} />
        </svg>
    );
};

SvgIcon.propTypes = {
    glyph: PropTypes.object.isRequired,
    className: PropTypes.string,
};
