import * as actions from '../actions';

const youtubeApiKey = 'AIzaSyA885cxQCDjevt1ZdAqIJgEDiePMQuIgOk';
const youtubeApiBaseUrl = 'https://www.googleapis.com/youtube/v3';
const encodedKeyword = "ta geule bruitage";
const url = youtubeApiBaseUrl + '/search?part=snippet&q=' + encodedKeyword + '&type=video&maxResults=10&key=' + youtubeApiKey;

export default (state = null, action) => {
    switch (action.type) {
        case 'fetch_videos':
            const {page, maxResults} = action.payload;
            return  fetch(url);
        default :
            return state;
    }
};