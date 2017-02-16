import React, {Component} from 'react';
import {View,TouchableOpacity, Text, AppRegistry} from 'react-native';
import YouTube from 'react-native-youtube';
import Video from 'react-native-video';
import styles from './style.single.videos';


export default class VideosSingle extends Component {
    /*state = {
        isReady: false,
        status: null,
        quality: null,
        error: null,
        isPlaying: true
    };*/

    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: true,
    };

    video: Video;

    render() {
        return (
        <View style={styles.container}>


            <Video
                ref={(ref: Video) => { this.video = ref }}
                source={require('./6uxgII0xDa4.mp4')}
                playInBackground={true}
                style={styles.fullScreen}
                rate={this.state.rate}
                paused={this.state.paused}
                volume={this.state.volume}
                muted={this.state.muted}
                resizeMode={this.state.resizeMode}
                onLoad={this.onLoad}
                onProgress={this.onProgress}
                onEnd={this.onEnd}
                onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                onAudioFocusChanged={this.onAudioFocusChanged}
                repeat={true}
            />

            <TouchableOpacity onPress={()=>{this.setState((s) => {return {isPlaying: !s.isPlaying};} )}}>
                <Text style={[styles.welcome, {color: 'blue'}]}>{this.state.status == 'playing' ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>

            <Text style={styles.instructions}>{this.state.isReady ? 'Player is ready.' : 'Player setting up...'}</Text>
            <Text style={styles.instructions}>Status: {this.state.status}</Text>
            <Text style={styles.instructions}>Quality: {this.state.quality}</Text>
            <Text style={styles.instructions}>{this.state.error ? 'Error: ' + this.state.error : ' '}</Text>

        </View>
        );
    }
}
