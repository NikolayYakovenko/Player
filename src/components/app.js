import React from 'react';
// import { Router } from 'react-router';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import createBrowserHistory from 'history/createBrowserHistory';

import { TrackList } from './trackList/trackList';
import { TrackInfo } from './trackInfo/trackInfo';

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
                    <Route exact path='/' component={TrackList} />
                    <Route path='/view/:id' component={TrackInfo} />
                </Switch>
            </Home>
        </HashRouter>
    );
};
