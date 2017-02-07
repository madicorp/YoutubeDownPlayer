import React, {Component} from 'react';
import {View,TouchableOpacity, Text, AppRegistry} from 'react-native';
import YouTube from 'react-native-youtube';
import styles from './style.single.songs';


export default class SongsSingle extends Component {
    state = {
        isReady: false,
        status: null,
        quality: null,
        error: null,
        isPlaying: true
    };

    render() {
        return (
        <View style={styles.container}>

            <YouTube
                ref="youtubePlayer"
                videoId={this.props.videoId}
                play={this.state.isPlaying}
                hidden={false}
                playsInline={true}
                apiKey="AIzaSyA885cxQCDjevt1ZdAqIJgEDiePMQuIgOk"
                onReady={(e)=>{this.setState({isReady: true})}}
                onChangeState={(e)=>{this.setState({status: e.state})}}
                onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
                onError={(e)=>{this.setState({error: e.error}); console.log(e)}}
                style={{alignSelf: 'stretch', height: 250, backgroundColor: 'black', marginVertical: 10}}
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

AppRegistry.registerHeadlessTask('YouTube', () => require('react-native-youtube'));