import React, {Component} from 'react';
import {View} from 'react-native';
import {Content, Spinner, List} from 'native-base';
import SongsDetail from '../detail/index.detail.songs'

export default class SongsList extends Component {

    youtubeApiKey = 'AIzaSyA885cxQCDjevt1ZdAqIJgEDiePMQuIgOk';
    youtubeApiBaseUrl = 'https://www.googleapis.com/youtube/v3';
    encodedKeyword = "test";
    url = this.youtubeApiBaseUrl + '/search?part=snippet&q=' + this.encodedKeyword + '&type=video&maxResults=10&key=' + this.youtubeApiKey;
    state = {songs: [], loading: true};

    componentWillMount() {

        fetch(this.url)
            .then(
                (response) => response.json()
                    .then((responseJson) => {
                        this.setState({loading: false, songs: responseJson.items})
                    })
            ).catch((error) => {
            console.error(error);
        });
    }

    renderSongs() {
        return this.state.songs.map(song => <SongsDetail key={song.id.videoId} song={song}/>);
    }

    render() {
        return (
            <Content>
                {
                    this.state.loading ?
                        <Spinner /> :
                        <List dataArray={this.state.songs}
                              renderRow={(song) => <SongsDetail key={song.id.videoId} song={song}/>}/>
                }
            </Content>
        );
    }
}