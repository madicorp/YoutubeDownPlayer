// Import libraries

import React, {Component} from 'react';
import {AppRegistry, View, Text, Modal} from 'react-native';
import {ListItem, Thumbnail, Icon, Button} from 'native-base';
import SongsSingle from '../single/index.single.songs';
import Styles from './style.detail.songs';

const  Sound = require('react-native-sound');
const RNFS = require('react-native-fs');

const {actionStyle} = Styles;

// create components
export default class SongsDetail extends Component {
    state = {ready: false, showModal: false};
    playSong(id) {
        const url = "http://www.youtubeinmp3.com/fetch/?format=JSON&video=http://www.youtube.com/watch?v=" + id;

        RNFS.exists(`${RNFS.DocumentDirectoryPath}/${id}.mp3`).then((result) => {

            if(result){
                console.log("file exist");
                this.setState({ ready: true })
            }else{
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
                                    this.setState({ ready: true })
                                });

                            })
                    )
            }
        });


    };
    setModalTo(showModal){
        this.setState({ showModal: showModal });

    }

    render() {
        if(this.state.ready){
            const whoosh = new Sound(`${this.props.song.id.videoId}.mp3`,RNFS.DocumentDirectoryPath, (error) => {
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
                <ListItem onPress={() => this.setModalTo(true)}>
                    <Thumbnail square size={80} source={{uri: this.props.song.snippet.thumbnails.medium.url}}/>
                    <Text>{this.props.song.snippet.title}</Text>
                    <Text note>{this.props.song.snippet.description}</Text>
                </ListItem>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <SongsSingle videoId={this.props.song.id.videoId} />
                    <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
                                        this.setModalTo(false)
                                    }}>
                        Retour
                    </Button>
                </Modal>
            </View>

        )
    };
}
