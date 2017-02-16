import React from 'react';
import {AppRegistry} from 'react-native';
import {Container, Content} from 'native-base';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './src/reducers';

import Header from './src/components/header/index.header';
import SongsList from  './src/components/videos/list/index.list.videos'
console.disableYellowBox = true;

const App = () => (
    <Provider store={createStore(reducers)}>
        <Container>
            <Header headerText={'MY TUBES !'}/>
            <Content>
                <SongsList />
            </Content>
        </Container>
    </Provider>
);

AppRegistry.registerComponent('YoutubeDownPlayer', () => App);