// Import libraries

import React from 'react';
import {View, Text} from 'react-native';

import HeaderStyles from './style.header';

// create components

const Header = (props) => {
    const {viewStyle, textStyle} = HeaderStyles;
    const {headerText} = props;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{headerText}</Text>
        </View>
    );
};

// expose the component

export default Header;