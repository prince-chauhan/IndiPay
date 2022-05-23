import React, { useRef, useEffect, Component } from 'react';
import { Alert, TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Loginnew from './Home';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import 'react-native-gesture-handler';
import MainApp from './Home';
import App from './Home';


class Login extends Component {

    render() {
        return (
            <View style={styles.background}>


                <View style={styles.slider}>
                    <Image style={[styles.image]} source={require('../assets/logo.png')} />
                    <Text style={[styles.text, styles.heading]}>Hi This is a heading</Text>
                    <Text style={[styles.text, styles.normal]}>Hi This is normal text, which will be s dsf dfg dfdhown here</Text>

                </View>
                <View style={styles.inlinebutton}>
                    <TouchableOpacity style={[styles.signinbutton, styles.button]} onPress={() => this.props.navigation.push('LoginButton')}><Text style={[styles.buttontext, {
                        color: '#4a4eed'
                    }]}> Log In</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.signupbutton, styles.button]} onPress={() => Alert.alert('Simple  pressed', 'hi its me')}>
                        <Text style={[styles.buttontext, {
                            color: 'white'
                        }]}>Sign Up</Text></TouchableOpacity>
                </View>

            </View>
        );
    }
}


// const [loaded] = useFonts({
//     Proxima: require('../assets/fonts/Proxima.ttf'),
//   });

const AppNavigator = createStackNavigator(
    {
        LoginScreen: {
            screen: Login,
            navigationOptions: {
                headerShown: false,
            }
        },
        LoginButton: {

            screen: App,
            navigationOptions: {
                headerShown: false,
            }
        },
        SignupButton: {
            screen: Loginnew,
            navigationOptions: {
                headerShown: false,
            }
        }
    },


);

const AppContainer = createAppContainer(AppNavigator);
export default class Log extends React.Component {
    render() {
        return (
            <AppContainer />

        )
            ;
    }
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        // marginBottom:'auto',
    },
    background: {
        backgroundColor: '#4a4eed',
        padding: '5%',
        height: '100%',
        flexDirection: 'column',
    },
    slider: {
        paddingTop: 10,
        flex: 2.7,
    },
    text: {
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
    },
    heading: {
        // fontWeight:700,
        fontSize: 20,
    },
    normal: {
        // fontWeight:500,
        fontSize: 16,
        padding: 10,
        marginBottom: 'auto',
    },
    inlinebutton: {
        flexDirection: 'row',
        flex: 0.35
    },
    signupbutton: {
        marginLeft: 25,
        marginRight: 7,
        backgroundColor: '#1b1c3a',
        color: 'white',

    },
    signinbutton: {
        marginLeft: 7,
        marginRight: 25,
        backgroundColor: 'white',

    },
    button: {
        borderRadius: 22,
        flex: 1,
        maxHeight: 50,

    },
    buttontext: {
        borderRadius: 22,
        padding: 13,
        fontSize: 18,
        fontWeight: '500',
        margin: 'auto',
        textAlign: 'center',

    }
});
