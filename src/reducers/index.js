import { combineReducers } from 'redux';

import { playerReducers } from './playerReducers';


const applicationReducers = combineReducers({
    ...playerReducers,
});

export default applicationReducers;
