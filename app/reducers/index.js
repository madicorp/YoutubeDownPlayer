import { combineReducers } from 'redux';

import * as api from './api.reducer';
import * as user from './user.reducer';
import * as music from './music.reducer';

export default combineReducers({...api, ...user, ...music});
