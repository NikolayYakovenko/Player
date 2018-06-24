import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundRoute = () => {
    return (
        <div>
            <b>404 ERROR</b>
            <br />
            No page found
            <br />
            <Link to='/'>
                Go to the main page
            </Link>
        </div>
    );
};

