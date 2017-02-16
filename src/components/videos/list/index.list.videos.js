import React, {Component} from 'react';
import {View} from 'react-native';
import {Content, Spinner, List} from 'native-base';
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import SongsDetail from '../detail/index.detail.videos'

class SongsList extends Component {
    componentWillMount() {
        this.props.fetchVideos();
    }

    renderSongs() {
        return this.videos.map(song => <SongsDetail key={song.id.videoId} song={song}/>);
    }

    render() {
        const {promiseVideos, loading, renderVideos, setLoading, videos} = this.props;
        if (promiseVideos && loading){
            promiseVideos.then(
                (response) => response.json()
                    .then((responseJson) => {
                        setLoading(false);
                        renderVideos(responseJson.items);
                    })
            ).catch((error) => {
                console.error(error);
            });
        }
        return (
            <Content>
                {
                    loading ?
                        <Spinner /> :
                        <List dataArray={videos}
                              renderRow={(video) => <SongsDetail key={video.id.videoId} video={video}/>}/>
                }
            </Content>
        );
    }
}

const mapStateToProps = state => {

    return { loading: state.loading, videos: state.videos, promiseVideos: state.promiseVideos };
};

export default connect(mapStateToProps , actions)(SongsList);