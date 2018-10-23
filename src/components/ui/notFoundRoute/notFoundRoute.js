import React from 'react';
import { Link } from 'react-router-dom';

import './notFoundRoute.css';


export const NotFoundRoute = () => {
    return (
        <div className='notFoundWrapper'>
            <b>404 ERROR</b>
            <p className='notFoundText'>No page found</p>
            <Link to='/'>
                Go to the main page
            </Link>
        </div>
    );
};

