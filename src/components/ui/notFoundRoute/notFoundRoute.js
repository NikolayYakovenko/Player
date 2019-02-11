import React from 'react';
import { Link } from 'react-router-dom';

import jam from './jam.jpg';
import './notFoundRoute.css';


export const NotFoundRoute = () => {
    return (
        <div className='notFoundWrapper'>
            <b>404 ERROR</b>
            <p className='notFoundText'>No page found</p>
            <Link to='/'>
                Go to the main page
            </Link>
            <div>
                <img
                    className='notFoundImage'
                    src={jam}
                    alt='jam'
                />
            </div>
        </div>
    );
};

