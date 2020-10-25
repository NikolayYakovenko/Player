import React from 'react';
import PropTypes from 'prop-types';

import './home.css';


export const Home = ({ children }) => {
    return (
        <div className='wrapper'>
            {children}
        </div>
    );
};

Home.propTypes = {
    children: PropTypes.any.isRequired,
};
