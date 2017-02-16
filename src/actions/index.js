export const fetchVideos = (page = 1, maxResults = 10) => {
    return {
        type: 'fetch_videos',
        payload: {
            page: page,
            maxResults: maxResults,
        }
    }
};
export const renderVideos = (videos) => {
    return {
        type: 'render_videos',
        payload: {
            videos: videos,
        }
    }
};

export const setLoading = (status) => {
    return {
        type: 'set_loading',
        payload: {
            status: status
        }
    }
};

export const setModalTo = (status) => {
    return {
        type: 'set_modal',
        payload: {
            status: status
        }
    }
};

export const selectVideo = (videoId) => {
    return {
        type: 'select_video',
        payload: {
            videoId: videoId
        }
    }
};

