import { combineReducers } from 'redux';

import { listReducers } from './listReducers';
import { playerReducers } from './playerReducers';


const applicationReducers = combineReducers({
    ...listReducers,
    ...playerReducers,
});

export default applicationReducers;
