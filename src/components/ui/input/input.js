import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import './input.css';


export const Input = (props) => {
    const {
        className, refFn, placeholder, onChange,
    } = props;

    const classes = cs('input', className);
    return (
        <input
            className={classes}
            type='text'
            ref={refFn}
            onChange={onChange}
            placeholder={placeholder}
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
    refFn: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};
