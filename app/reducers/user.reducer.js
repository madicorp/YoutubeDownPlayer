import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const authenticate = createReducer([], {
    [types.AUTHENTICATE](state, action) {
        return action.user;
    }
});

