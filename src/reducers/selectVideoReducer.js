export default (state = null, action) => {

    switch (action.type) {
        case 'select_video':
            const {videoId} = action.payload;
            return videoId;
        default :
            return state;
    }

};