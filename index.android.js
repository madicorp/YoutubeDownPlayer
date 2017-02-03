// Import section

import React from 'react';
import {AppRegistry} from 'react-native';
import {Container, Content} from 'native-base';

// Import Custom Components

import Header from './src/components/header/index.header';
import SongsList from  './src/components/songs/list/index.list.songs'

// Create a component

const App = () => (
    <Container>
        <Header headerText={'MY TUBES !'}/>
        <Content>
            <SongsList />
        </Content>
    </Container>
);

// render the component

AppRegistry.registerComponent('YoutubeDownPlayer', () => App);