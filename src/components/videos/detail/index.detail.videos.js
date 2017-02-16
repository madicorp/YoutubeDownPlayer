// Import libraries

import React, {Component} from 'react';
import {AppRegistry, View, Text, Modal} from 'react-native';
import {ListItem, Thumbnail, Icon, Button} from 'native-base';
import VideosSingle from '../single/index.single.videos';
import Styles from './style.detail.videos';
import {connect} from 'react-redux';
import * as actions from '../../../actions';

const Sound = require('react-native-sound');
const RNFS = require('react-native-fs');

const {actionStyle} = Styles;

// create components
class VideosDetail extends Component {
    state = {ready: false,};

    playSong(id) {
        const url = "http://www.youtubeinmp3.com/fetch/?format=JSON&video=http://www.youtube.com/watch?v=" + id;

        RNFS.exists(`${RNFS.DocumentDirectoryPath}/${id}.mp3`).then((result) => {

            if (result) {
                console.log("file exist");
                this.setState({ready: true})
            } else {
                fetch(url)
                    .then(
                        (response) => response.json()
                            .then((responseJson) => {
                                console.log(responseJson);
                                console.log(RNFS.DocumentDirectoryPath);
                                RNFS.downloadFile({
                                    fromUrl: responseJson.link,
                                    toFile: `${RNFS.DocumentDirectoryPath}/${id}.mp3`,
                                }).promise.then((r) => {
                                    console.log(r);
                                    this.setState({ready: true})
                                });

                            })
                    )
            }
        });


    };

    setModalTo(showModal) {
        const selected = showModal ? this.props.video.id.videoId : null;
        this.props.selectVideo(selected);
        this.props.setModalTo(showModal, selected, this.props.video.id.videoId)

    }

    getModalState(showModal){
        return showModal && this.props.video.id.videoId == this.props.selectedVideoId
    }

    render() {
        const {showModal} = this.props;
        if (this.state.ready) {
            const whoosh = new Sound(`${this.props.video.id.videoId}.mp3`, RNFS.DocumentDirectoryPath, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                } else { // loaded successfully
                    console.log('duration in seconds: ' + whoosh.getDuration() +
                        'number of channels: ' + whoosh.getNumberOfChannels());
                    whoosh.play();
                }
            });
        }
        return (
            <View>
                <ListItem onPress={() =>  this.setModalTo(true)}>
                    <Thumbnail square size={80} source={{uri: this.props.video.snippet.thumbnails.medium.url}}/>
                    <Text>{this.props.video.snippet.title}</Text>
                    <Text note>{this.props.video.snippet.description}</Text>
                </ListItem>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.getModalState(showModal) }
                    onRequestClose={() => { this.setModalTo(false)}}>
                    <VideosSingle videoId={this.props.video.id.videoId}/>
                    <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
                                        this.setModalTo(false)
                                    }}>
                        Retour
                    </Button>
                </Modal>
            </View>

        )
    }
}

const mapStateToProps = state => {

    return {showModal: state.showModal, selectedVideoId: state.selectedVideoId};
};

export default connect(mapStateToProps, actions)(VideosDetail);
