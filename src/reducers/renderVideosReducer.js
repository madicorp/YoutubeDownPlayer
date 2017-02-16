import * as actions from '../actions';
export default (state = null, action) => {

    switch (action.type) {
        case 'render_videos':
            const {videos} = action.payload;
            return videos;
        default :
            return state;
    }

};