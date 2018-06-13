import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { App } from './components/app';

const root = document.getElementById('root');
render(React.createElement(App, {}, null), root);
