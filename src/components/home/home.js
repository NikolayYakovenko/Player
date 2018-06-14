import React from 'react';
import PropTypes from 'prop-types';

import './home.css';


export const Home = (props) => {
    return (
        <div className='wrapper'>
            {props.children}
        </div>
    );
};

Home.propTypes = {
    children: PropTypes.any.isRequired,
};
