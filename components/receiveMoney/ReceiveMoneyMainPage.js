import React, { useRef, useEffect, Component } from 'react';
import { Share, Alert, TouchableOpacity, ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';


let customFonts = {
    'Ocrb': require('../../assets/fonts/OCRB-Medium.ttf'),
    'ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
    'ubuntu-med': require('../../assets/fonts/Ubuntu-Medium.ttf'),
    'ubuntu-bold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
    'ubuntu-light': require('../../assets/fonts/Ubuntu-Light.ttf'),
};


class ReceiveMoney extends Component {
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
    onShare = async () => {
        try {
            const result = await Share.share({
                message: 'hdi',
                url: 'data:image/png;base64,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',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    render() {


        if (!this.state.fontsLoaded) {
            return null;
        }
        let logoFromFile = require('../../assets/logo.png');
        return (
            <ScrollView style={[styles.background]}>
                <View style={[{ backgroundColor: 'white', marginLeft: 10, height: 500, marginTop: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 20, paddingTop: 18, borderRadius: 10, marginBottom: 40, elevation: 4 }]}>
                    <Text style={[{ fontFamily: 'ubuntu-med', fontSize: 22, textAlign: 'center', marginBottom: 35 }]}>
                        Receive Money
                    </Text>
                    <View style={[{ padding: 10, marginLeft: 'auto', marginRight: 'auto' }]}>
                        <QRCode value='https://awesome.link.qr' size={250} logo={logoFromFile} logoSize={60} logoBackgroundColor='white' backgroundColor='transparent' />
                    </View>
                    <TouchableOpacity style={[{ marginTop: 30, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 25, padding: 15, paddingRight: 25, }]} onPress={this.onShare}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#130f40', '#000000']}
                            style={[{
                                position: 'absolute',
                                left: 0,
                                // width: 47,
                                height: 51,
                                borderRadius: 8,
                                right: 0,
                            }]}
                        />
                        <Text style={[{ fontSize: 20, fontFamily: 'ubuntu-med', color: 'white' }]}>
                            Share <MaterialCommunityIcons name='share' size={20} />
                        </Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>
        );
    }
}
export default ReceiveMoney;

const styles = StyleSheet.create({

    background: {
        backgroundColor: '#ecf3ff',
        height: '100%',
        flexDirection: 'column',
        padding: 5
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 50,
        paddingLeft: 10,
        borderWidth: 1,
        marginRight: 15,
        marginLeft: 15,
        fontSize: 20,
    }
});
