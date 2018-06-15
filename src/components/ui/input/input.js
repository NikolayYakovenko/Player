import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import './input.css';


export const Input = (props, ...restProps) => {
    const classes = cs('input', props.className);
    return (
        <input
            className={classes}
            type='text'
            onChange={props.onChange}
            placeholder={props.placeholder}
            {...restProps}
        />
    );
};

Input.defaultProps = {
    placeholder: '',
    className: '',
    onChange: null,
};

Input.propTypes = {
    onChange: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};
