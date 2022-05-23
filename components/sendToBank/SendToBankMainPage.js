import React, { useRef, useEffect, Component } from 'react';
import { TextInput, Alert, TouchableOpacity, ScrollView, Image, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { isLoading } from 'expo-font';


let customFonts = {
    'Ocrb': require('../../assets/fonts/OCRB-Medium.ttf'),
    'ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
    'ubuntu-med': require('../../assets/fonts/Ubuntu-Medium.ttf'),
    'ubuntu-bold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
    'ubuntu-light': require('../../assets/fonts/Ubuntu-Light.ttf'),
};


class SendToBank extends Component {
    state = {
        fontsLoaded: false,
        accountnumber: null,
        ifsc: '',
        confirmaccountnumber: null,
        data: [],
        number: null,
    };
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    async getBank() {

        try {
            const response = await fetch('https://ifsc.razorpay.com/' + this.state.ifsc);
            const json = await response.json();
            this.setState({ data: json });
            console.log(json);
        } catch (error) {
            console.log(error);
        } finally {
        }
    }

    render() {
        let ifsclength = this.state.ifsc.length;

        if (!this.state.fontsLoaded) {
            return null;
        }

        return (
            <ScrollView style={[styles.background]}>
                <View style={[{ backgroundColor: 'white', marginLeft: 10, marginTop: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 20, paddingTop: 18, borderRadius: 10, marginBottom: 40, elevation: 4 }]}>
                    <Text style={[{ fontFamily: 'ubuntu-med', fontSize: 22, marginBottom: 15, textAlign: 'center' }]}>
                        Transfer Money To Bank
                    </Text>
                    <TextInput placeholder='Account Number' secureTextEntry={true} style={[styles.input, { fontFamily: 'ubuntu' }]} keyboardType='numeric' maxLength={7} onChangeText={(value) => this.setState({ accountnumber: value })} value={this.state.accountnumber} blurOnSubmit={true} />
                    <TextInput placeholder='Confirm Account Number' style={[styles.input, { fontFamily: 'ubuntu' }]} keyboardType='numeric' maxLength={7} onChangeText={(value) => this.setState({ confirmaccountnumber: value })} value={this.state.confirmaccountnumber} blurOnSubmit={true} />
                    <Text style={[{ color: 'red', marginLeft: 18, marginTop: (this.state.confirmaccountnumber != this.state.accountnumber) ? 5 : -15 }]}>{(this.state.confirmaccountnumber != this.state.accountnumber) ? '**Account Number did not matched' : ''}</Text>
                    <TextInput placeholder='IFSC' onTextInput={() => ifsclength == 11 ? this.getBank() : null} style={[styles.input, { fontFamily: 'ubuntu' }]} autoCapitalize='characters' keyboardType='default' maxLength={11} onChangeText={(value) => this.setState({ ifsc: value })} value={this.state.ifsc} blurOnSubmit={true} />

                    {ifsclength == 11 ? this.state.data.IFSC == this.state.ifsc ? (
                        <Text style={[{ color: 'green', marginLeft: 18, marginTop: 5 }]}><MaterialIcons name='verified' marginTop={5} size={15} /> {this.state.data.BANK}, {this.state.data.BRANCH}</Text>

                    ) : null : null}
                    <TextInput placeholder='Amount' style={[styles.input, { fontFamily: 'ubuntu' }]} keyboardType='numeric' maxLength={7} onChangeText={(value) => this.setState({ number: value })} value={this.state.number} blurOnSubmit={true} />
                    <Text style={[{ color: 'red', marginLeft: 18, marginTop: ((this.state.number) >= 100 ? ((this.state.number) <= 10000 ? -15 : 5) : 5) }]}>{(this.state.number) < 100 ? '**Minimum transfer amount 100 Rs' : ''}{(this.state.number) > 10000 ? '**You can transfer upto 10,000 to your bank account' : ''}</Text>
                    <TouchableOpacity style={[{ marginTop: 30, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 25, padding: 15, paddingRight: 25, }]} disabled={(this.state.number) >= 100 ? ((this.state.number) > 10000 ? true : false) : true} onPress={() => Alert.alert(this.state.number)}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={(this.state.number) >= 100 ? ((this.state.number) <= 10000 ? ['#130f40', '#000000'] : ['gray', 'gray']) : ['gray', 'gray']}
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
                            Transfer To Bank
                        </Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        );
    }
}
export default SendToBank;

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
        marginTop: 15,
        marginLeft: 15,
        fontSize: 20,
    }
});
