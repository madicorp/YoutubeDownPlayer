import React, {Component, PropTypes} from 'react';

import Dimensions from 'Dimensions';
import Logo from './Logo';
import Wallpaper from './Wallpaper';
import {
    View,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ActionCreators from '../actions';
import {Actions} from 'react-native-router-flux';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Spinner from 'react-native-loading-spinner-overlay';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

class LoginScreen extends Component {

    state = {
        loading: false
    };

    componentDidMount = async() => {
        this._setupGoogleSignin();
    };

    _setupGoogleSignin = async() => {
        try {
            await GoogleSignin.hasPlayServices({autoResolve: true});
            await GoogleSignin.configure({
                scopes: ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly'],
                webClientId: '7759088078-kg4vja08uqq2tjfk554i7r3pq6uf7m6h.apps.googleusercontent.com',
                offlineAccess: true
            });

            const user = await GoogleSignin.currentUserAsync();
            this.setState({user: user});
        }
        catch (err) {
            console.log("Play services error", err.code, err.message);
        }
    };

    _signIn = () => {
        this.setState({loading: true});
        GoogleSignin.signIn()
            .then((user) => {
                this.props.authenticate(user);
                Actions.home();
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
                this.setState({loading: false});
            })
            .done(() => {
                this.setState({loading: false});
            });
    };

    render() {
        const textContent = "Loading...";
        return (
            <Wallpaper>
                {
                    this.state.loading ?
                        <View style={{ flex: 1 }}><Spinner visible={this.state.loading} textContent={textContent}
                                                           textStyle={{color: '#FFF'}}/></View> : null

                }

                <Logo />
                <View style={styles.container}>
                    <GoogleSigninButton style={styles.button} color={GoogleSigninButton.Color.Dark}
                                        size={GoogleSigninButton.Size.Standard}
                                        onPress={() => { this._signIn(); }}/>
                </View>
            </Wallpaper >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: -95,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
        width: 412, height: 80
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {

    return {
        authenticate: store.authenticate,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
