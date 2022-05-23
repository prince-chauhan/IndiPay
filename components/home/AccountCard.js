import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

let customFonts = {
    'Ocrb': require('../../assets/fonts/OCRB-Medium.ttf'),
    'ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
    'ubuntu-med': require('../../assets/fonts/Ubuntu-Medium.ttf'),
    'ubuntu-bold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
};

class AccountCard extends Component {
    state = {
        fontsLoaded: false,
    };

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {
        if (!this.state.fontsLoaded) {
            return null;
        }
        return (
            <View style={[styles.mainCard]}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#2d3436', '#000000']}
                    style={styles.background}
                />
                <View style={[styles.body]}>
                    <View style={[{ flexDirection: 'row' }]}>
                        <View style={[{ flex: 1 }]}>
                            <Text style={[styles.bodyColor, styles.balance]}>
                                Balance <MIcon name="refresh" size={18} style={[{}]} />
                            </Text>
                            <Text style={[styles.bodyColor, styles.amount]}>
                                {/* <FIcon name="rupee" size={23} style={[{}]} /> */}
                                {'\u20B9'} 10,000.00
                            </Text>
                        </View>
                        <Image source={require('../../assets/img/card/visa4.png')} style={[{ height: 25, flex: 0.4, marginTop: 'auto', marginBottom: 'auto' }]} />
                    </View>
                    <Text style={[styles.bodyColor, styles.cardnumber]}>**** **** **** 2035</Text>
                    <View style={[{ flexDirection: 'row' }]}>
                        <View style={[{ flex: 1 }]}>
                            <Text style={[styles.bodyColor, styles.query]}>Account Holder</Text>
                            <Text style={[styles.bodyColor, styles.customername]}>Prince Chauhan</Text>
                        </View>
                        <View style={[{ flex: 0.4 }]}>
                            <Text style={[styles.bodyColor, styles.query]}>Expires</Text>
                            <Text style={[styles.bodyColor, styles.expiry]}>09/24   </Text>
                        </View>
                    </View>

                </View>
            </View>
        );

    }
}

export default AccountCard;

const styles = StyleSheet.create({
    mainCard: {
        backgroundColor: '#a4098f',
        height: 210,
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        elevation: 10,
        shadowColor: 'black',


    },
    background: {
        position: 'absolute',
        left: 0,
        borderRadius: 15,
        right: 0,
        height: 210,
    },
    cardnumber: {
        marginTop: 40,
        fontSize: 25,
        marginBottom: 15,
        textAlign: 'left',
        fontFamily: 'Ocrb',
    },
    body: {
        paddingLeft: 30,
        paddingTop: 20,
        paddingRight: 30,
        paddingBottom: 20,
    },
    bodyColor: {
        color: 'white',
        textTransform: 'uppercase'
    },
    balance: {
        fontSize: 12,
    },
    query: {
        fontSize: 12,
        marginTop: 10,
        fontFamily: 'ubuntu',

    },
    customername: {
        fontSize: 18,
        marginTop: 6,
        fontFamily: 'Ocrb',
    },
    expiry: {
        fontSize: 18,
        marginTop: 6,
        fontFamily: 'Ocrb',
    },

    amount: {
        fontSize: 25,
        fontFamily: 'ubuntu-bold',
        marginTop: 6,
    },
});