import React from 'react';
import { NavLink } from 'react-router-dom';

import './navigation.css';


export function Navigation() {
    return (
        <div className='tabs'>
            <NavLink
                exact
                className='tab'
                activeClassName='tabActive'
                to='/'
            >
                Track list
            </NavLink>
            <NavLink
                exact
                className='tab'
                activeClassName='tabActive'
                to='/fav'
            >
                Favourites
            </NavLink>
        </div>
    );
}
