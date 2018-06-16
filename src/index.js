import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import { App } from './components/app';

import applicationReducers from './reducers';


// /* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
/* eslint-disable no-underscore-dangle */

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));
const store = createStore(applicationReducers, enhancer);

const AppWithProvider = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

const root = document.getElementById('root');
render(
    <AppWithProvider />,
    root,
);
