import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../styles/reset.css';
import '../styles/base.css';

import { Home } from './home/home';
import { TrackListContainer } from './trackList/trackListContainer';
import { TrackInfoContainer } from './trackInfo/trackInfoContainer';
import { FavListContainer } from './favList/favListContainer';

import { NotFoundRoute } from './ui/notFoundRoute/notFoundRoute';


export const App = () => {
    return (
        <BrowserRouter >
            <Home>
                <Switch>
                    <Route path='/' exact component={TrackListContainer} />
                    <Route path='/fav' exact component={FavListContainer} />
                    <Route path='/view/:id' exact component={TrackInfoContainer} />
                    <Route component={NotFoundRoute} />
                </Switch>
            </Home>
        </BrowserRouter>
    );
};
