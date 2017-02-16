import {combineReducers} from 'redux';
import FetchVideosReducer from './fetchVideosReducer';
import RenderVideosReducer from './renderVideosReducer';
import SetLoadingReducer from './setLoadingReducer';
import SetModalToReducer from './setModalToReducer';
import SelectVideoReducer from './selectVideoReducer';


export default combineReducers({
    videos: RenderVideosReducer,
    promiseVideos: FetchVideosReducer,
    loading: SetLoadingReducer,
    showModal: SetModalToReducer,
    selectedVideoId: SelectVideoReducer
});