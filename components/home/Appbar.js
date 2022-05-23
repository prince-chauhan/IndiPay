import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

let customFonts = {
    'Ocrb': require('../../assets/fonts/OCRB-Medium.ttf'),
    'ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
    'ubuntu-med': require('../../assets/fonts/Ubuntu-Medium.ttf'),
    'ubuntu-bold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
};


class IconBar extends Component {
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
            <View>
                <View style={[{ flexDirection: 'column', backgroundColor: 'white', marginLeft: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10, paddingTop: 18, borderRadius: 20, marginBottom: 30, elevation: 4 }]}>
                    <Text style={[{ fontFamily: 'ubuntu-med', fontSize: 20, marginLeft: 15, marginBottom: 25 }]}>
                        Payments
                    </Text>
                    <View style={[{ flexDirection: 'row', flex: 1 }]}>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <TouchableOpacity onPress={() => { Alert.alert('jop') }}>

                                <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                    <LinearGradient
                                        // Background Linear Gradient
                                        colors={['#8d00ff', '#a4098f']}
                                        style={[{
                                            position: 'absolute',
                                            left: 0,
                                            width: 47,
                                            height: 48,
                                            borderRadius: 9,
                                            right: 0,
                                        }]}
                                    />
                                    <MaterialCommunityIcons name="plus" color='white' size={25} />
                                </View>
                                <Text style={[styles.iconText, { flex: 1 }]} >Add Money

                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                <LinearGradient
                                    // Background Linear Gradient
                                    colors={['#8d00ff', '#a4098f']}
                                    style={[{
                                        position: 'absolute',
                                        left: 0,
                                        width: 47,
                                        height: 48,
                                        borderRadius: 9,
                                        right: 0,
                                    }]}
                                />
                                <MaterialCommunityIcons name="qrcode-scan" color='white' size={25} />
                            </View>
                            <Text style={[styles.iconText, { flex: 1 }]} >Scan QR

                            </Text>
                        </View>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                <LinearGradient
                                    // Background Linear Gradient
                                    colors={['#8d00ff', '#a4098f']}
                                    style={[{
                                        position: 'absolute',
                                        left: 0,
                                        width: 47,
                                        height: 48,
                                        borderRadius: 9,
                                        right: 0,
                                    }]}
                                />
                                <MaterialCommunityIcons name="bank" color='white' size={25} />
                            </View>
                            <Text style={[styles.iconText, { flex: 1 }]} >Send to Bank

                            </Text>
                        </View>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                <LinearGradient
                                    // Background Linear Gradient
                                    colors={['#8d00ff', '#a4098f']}
                                    style={[{
                                        position: 'absolute',
                                        left: 0,
                                        width: 47,
                                        height: 48,
                                        borderRadius: 9,
                                        right: 0,
                                    }]}
                                />
                                <MaterialCommunityIcons name="currency-usd" color='white' size={25} />
                            </View>
                            <Text style={[styles.iconText, { flex: 1 }]} >Send Abroad

                            </Text>
                        </View>
                    </View>

                    <View style={[{ flexDirection: 'row', flex: 1, marginTop: 15 }]}>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                <LinearGradient
                                    // Background Linear Gradient
                                    colors={['#8d00ff', '#a4098f']}
                                    style={[{
                                        position: 'absolute',
                                        left: 0,
                                        width: 47,
                                        height: 48,
                                        borderRadius: 9,
                                        right: 0,
                                    }]}
                                />
                                <MaterialCommunityIcons name="download" color='white' size={25} />
                            </View>
                            <Text style={[styles.iconText, { flex: 1 }]} >Receive

                            </Text>
                        </View>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                <LinearGradient
                                    // Background Linear Gradient
                                    colors={['#8d00ff', '#a4098f']}
                                    style={[{
                                        position: 'absolute',
                                        left: 0,
                                        width: 47,
                                        height: 48,
                                        borderRadius: 9,
                                        right: 0,
                                    }]}
                                />
                                <MaterialCommunityIcons name="receipt" color='white' size={25} />
                            </View>
                            <Text style={[styles.iconText, { flex: 1 }]} >History

                            </Text>
                        </View>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                <LinearGradient
                                    // Background Linear Gradient
                                    colors={['#8d00ff', '#a4098f']}
                                    style={[{
                                        position: 'absolute',
                                        left: 0,
                                        width: 47,
                                        height: 48,
                                        borderRadius: 9,
                                        right: 0,
                                    }]}
                                />
                                <MaterialCommunityIcons name="arrow-right-thin-circle-outline" color='white' size={25} />
                            </View>
                            <Text style={[styles.iconText, { flex: 1 }]} >View More

                            </Text>
                        </View>
                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                        </View>
                    </View>
                </View>

                {/* <View style={[{ flexDirection: 'column', backgroundColor: 'white', marginLeft: 20, marginRight: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 30, paddingTop: 30, borderRadius: 10, borderColor: '#84868a', borderWidth: 0.5, marginBottom: 30 }]}>

                    <View style={[{ flexDirection: 'row', flex: 1 }]}>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <MaterialCommunityIcons name="plus" style={[styles.icon, { flex: 1 }]} color='black' size={25} />
                            <Text style={[styles.iconText, { flex: 1 }]} >Add Money

                            </Text>
                        </View>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <MaterialCommunityIcons name="qrcode-scan" style={[styles.icon, { flex: 1 }]} color='black' size={25} />
                            <Text style={[styles.iconText, { flex: 1 }]} >Scan

                            </Text>
                        </View>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <MaterialCommunityIcons name="bank" style={[styles.icon, { flex: 1 }]} color='black' size={25} />
                            <Text style={[styles.iconText, { flex: 1 }]} >Send to Bank

                            </Text>
                        </View>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <MaterialCommunityIcons name="airplane" style={[styles.icon, { flex: 1 }]} color='black' size={25} />
                            <Text style={[styles.iconText, { flex: 1 }]} >Remmitance

                            </Text>
                        </View>
                    </View>

                    <View style={[{ flexDirection: 'row', flex: 1, marginTop: 40 }]}>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <MaterialCommunityIcons name="download" style={[styles.icon, { flex: 1 }]} color='black' size={25} />
                            <Text style={[styles.iconText, { flex: 1 }]} >Receive

                            </Text>
                        </View>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <MaterialCommunityIcons name="receipt" style={[styles.icon, { flex: 1 }]} color='black' size={25} />
                            <Text style={[styles.iconText, { flex: 1 }]} >History

                            </Text>
                        </View>

                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                            <MaterialCommunityIcons name="arrow-right-thin-circle-outline" style={[styles.icon, { flex: 1 }]} color='black' size={25} />
                            <Text style={[styles.iconText, { flex: 1 }]} >View More

                            </Text>
                        </View>
                        <View style={[{ flexDirection: 'column', flex: 1 }]}>
                        </View>
                    </View>
                </View> */}
            </View>
        );
    }
}

export default IconBar;

const styles = StyleSheet.create({
    icon: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'white',
        padding: 10,
        width: 47,
        maxHeight: 50,
        borderRadius: 9,
        backgroundColor: '#7c00ff',
    },
    iconText: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'ubuntu',
        padding: 10

    }
});