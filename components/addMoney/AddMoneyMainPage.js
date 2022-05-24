import React, { useRef, useEffect, Component } from 'react';
import { TextInput, Alert, TouchableOpacity, ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';


let customFonts = {
    'ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
    'ubuntu-med': require('../../assets/fonts/Ubuntu-Medium.ttf'),
    'ubuntu-bold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
    'ubuntu-light': require('../../assets/fonts/Ubuntu-Light.ttf'),
};


class AddMoney extends Component {
    state = {
        fontsLoaded: false,
        number: '',
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
            <ScrollView style={[styles.background]}>
                <View style={[{ backgroundColor: 'white', marginLeft: 10, height: 250, marginTop: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 20, paddingTop: 18, borderRadius: 10, marginBottom: 40, elevation: 4 }]}>
                    <Text style={[{ fontFamily: 'ubuntu-med', fontSize: 22, marginBottom: 35, textAlign: 'center' }]}>
                        Add Money to wallet
                    </Text>
                    <TextInput placeholder='Enter Amount' style={[styles.input, { fontFamily: 'ubuntu' }]} keyboardType='numeric' maxLength={7} onChangeText={(value) => this.setState({ number: value })} value={this.state.number} blurOnSubmit={true} inlineImageLeft='search_icon' />
                    <Text style={[{ color: 'red', marginLeft: 18, marginTop: 5 }]}>{(this.state.number) < 1 ? '**Minimum amount to be added 1 Rs' : ''}{(this.state.number) > 10000 ? '**You can add maximum 10,000 in your wallet' : ''}</Text>
                    <TouchableOpacity style={[{ marginTop: 30, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 25, padding: 15, paddingRight: 25, }]} disabled={(this.state.number) >= 1 ? ((this.state.number) > 10000 ? true : false) : true} onPress={() => Alert.alert(this.state.number)}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={(this.state.number) >= 1 ? ((this.state.number) <= 10000 ? ['#130f40', '#000000'] : ['gray', 'gray']) : ['gray', 'gray']}
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
                            Proceed To Pay
                        </Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        );
    }
}
export default AddMoney;

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
