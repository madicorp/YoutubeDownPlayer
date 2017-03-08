import React, {Component} from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../actions';
import Styles from '../styles';
import * as Progress from 'react-native-progress';
import Song from '../components/Song';
import * as Utils from '../helpers/utils';
import Spinner from 'react-native-loading-spinner-overlay';

class SearchResults extends Component {


    onPress(song) {
        console.log("onPress");
        this.props.downloadMusic(song, this.props.selectedVideo.url);
    }

    songClick(data, index) {
        Actions.player({
            searchedSongs: this.props.searchResults,
            songIndex: index,
            onMusicDownload: this.onPress.bind(this)
        });
        this.props.selectVideo(data);

    }

    render() {
        return (
            <ScrollView>

                {
                    this.props.searchResults.map((song, index) => {
                        return <Song
                                    key={index}
                                    onPress={this.songClick.bind(this, song, index)}
                                    songName={song.title}
                                    artistName={song.artist}
                                    songImage={song.thumb}
                                    id={song.id}
                                    progreses={this.props.progreses}
                                    downloading={song.downloading}
                                    downloadMusic={this.onPress.bind(this, song)}
                                    search={true}
                                />
                    })
                }
            </ScrollView>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {
    return {
        searchResults: store.searchResults,
        progreses: store.progreses,
        selectedVideo: store.selectedVideo,
        downloadMusic: store.downloadMusic,
        selectVideo: store.selectVideo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
