import React, {Component} from 'react';
import {View} from 'react-native';
import {Content, List} from 'native-base';
import SongsDetail from '../detail/index.detail.songs'

class SongsList extends Component {

    youtubeApiKey = 'AIzaSyA885cxQCDjevt1ZdAqIJgEDiePMQuIgOk';
    youtubeApiBaseUrl = 'https://www.googleapis.com/youtube/v3';
    encodedKeyword = "Ta gueule : Bruit";
    url = this.youtubeApiBaseUrl + '/search?part=snippet&q='+this.encodedKeyword+'&type=video&maxResults=10&key=' + this.youtubeApiKey;
    state = {songs: []};

    componentWillMount() {
        fetch(this.url)
            .then(
                (response) => response.json()
                    .then((responseJson) => {
                        console.log(responseJson);
                        this.setState({songs: responseJson.items})
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
            <List>
                {this.renderSongs()}
            </List>
        );
    }
}

export default SongsList;