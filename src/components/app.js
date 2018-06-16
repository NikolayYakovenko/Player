import React from 'react';
// import { Router } from 'react-router';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import createBrowserHistory from 'history/createBrowserHistory';

import { TrackListContainer } from './trackList/trackListContainer';
import { TrackInfoContainer } from './trackInfo/trackInfoContainer';

import '../styles/reset.css';
import '../styles/base.css';
import { Home } from './home/home';


export const App = () => {
    // const history = createBrowserHistory();
    // const BASE_URL = '/';
    return (
        <HashRouter>
            <Home>
                <Switch>
                    <Route exact path='/' component={TrackListContainer} />
                    <Route path='/view/:id' component={TrackInfoContainer} />
                </Switch>
            </Home>
        </HashRouter>
    );
};
