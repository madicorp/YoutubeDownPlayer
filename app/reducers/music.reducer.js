import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';


export const selectedVideo = createReducer([], {
    [types.SELECTVIDEO](state, action) {
        return action.video;
    }
});

