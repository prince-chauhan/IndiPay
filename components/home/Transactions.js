import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

let customFonts = {
    'Ocrb': require('../../assets/fonts/OCRB-Medium.ttf'),
    'ubuntu-light': require('../../assets/fonts/Ubuntu-Light.ttf'),
    'ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
    'ubuntu-med': require('../../assets/fonts/Ubuntu-Medium.ttf'),
    'ubuntu-bold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
};

class Transactions extends Component {

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
        const myIcon = <Icon name="rocket" size={30} color="#900" />;
        const transactionData = [];
        return (
            <View style={[]}>
                <View style={[{ flexDirection: 'row' }]}>
                    <Text style={[{ fontSize: 20, flex: 1, fontWeight: '500', color: '#4d4c4b', marginLeft: 15, marginBottom: 20 }]}>Transactions</Text>
                    <Icon name="arrowright" size={20} style={[{ flex: 0.1, marginRight: 15 }]} color="#4d4c4b" />
                </View>
                <View style={[{ marginLeft: 10, elevation: 5, marginRight: 10, borderRadius: 10, backgroundColor: 'white', padding: 5, marginBottom: 10 }]}>

                    <Transactionslist data={transactionData} ></Transactionslist>
                </View>
            </View>
        );
    }
}

class Transactionslist extends Component {
    render() {
        function separateComma(val) {
            // remove sign if negative
            var sign = 1;
            if (val < 0) {
                sign = -1;
                val = -val;
            }
            // trim the number decimal point if it exists
            let num = val.toString().includes('.') ? val.toString().split('.')[0] : val.toString();
            let len = num.toString().length;
            let result = '';
            let count = 1;

            for (let i = len - 1; i >= 0; i--) {
                result = num.toString()[i] + result;
                if (count % 3 === 0 && count !== 0 && i !== 0) {
                    result = ',' + result;
                }
                count++;
            }

            // add number after decimal point
            if (val.toString().includes('.')) {
                result = result + '.' + val.toString().split('.')[1];
            }
            else {
                result = result + '.00';

            }
            // return result with - sign if negative
            return sign < 0 ? result : result;
        }

        var trans = [];
        if (this.props.data.length > 0) {
            for (var i = 0; i < (this.props.data.length < 7 ? this.props.data.length : 7); i++) {
                trans.push(
                    <View key={i} style={[{ flexDirection: 'row', borderColor: 'black', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dce1e3', paddingBottom: 5, height: 80, paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15 }]}>
                        {/* <Text style={[{ height: 60, flex: 0.35, borderWidth: 2, borderColor: 'white', borderRadius: 30, marginTop: -5, backgroundColor: '#0abcfc' }]}><MIcon name={'alpha-' + this.props.data[i].client[0].toLowerCase()} size={70} /></Text> */}

                        {/* <Image source={require('../../assets/img/vendor-logo/shop.png')} style={[{ height: 50, flex: 0.35 }]} /> */}
                        <View style={[{
                            // marginLeft: 10,
                            // marginTop: 10,
                            borderRadius: 35,
                            padding: 10,
                            marginLeft: -4.5,
                            borderWidth: 2,
                            flex: 0.19,
                        }]} backgroundColor='#a4098f' borderColor={this.props.data[i].bgcolor}>
                            <LinearGradient
                                // Background Linear Gradient
                                colors={['#130f40', '#000000']}
                                style={[{
                                    position: 'absolute',
                                    left: 0,
                                    borderRadius: 25,
                                    right: 0,
                                    height: 45,
                                }]}
                            />
                            <MaterialCommunityIcons name={this.props.data[i].icon} style={[{}]} color='white' size={25} />
                        </View>
                        <View style={[{ flexDirection: 'column', flex: 1.2, marginLeft: 18 }]}>
                            <Text style={[{ fontSize: 16, fontFamily: 'ubuntu', flex: 1 }]}>{this.props.data[i].client.substring(0, 20)}</Text>
                            <Text style={[{ fontSize: 12, fontFamily: 'ubuntu-light', flex: 0.8 }]}>{this.props.data[i].date}</Text>
                            <Text style={[{ fontSize: 14, fontFamily: 'ubuntu-light', flex: 0.8 }]}>Txn. ID : UI89273F980</Text>
                        </View>

                        <Text style={[{ color: (this.props.data[i].amount < 0 ? 'red' : 'green'), fontFamily: 'ubuntu', fontSize: 15, flex: 1, marginTop: 'auto', marginBottom: 'auto', textAlign: 'right', fontWeight: '500' }]}>
                            {this.props.data[i].amount < 0 ? '- ' : '+ '}{'\u20B9'}{separateComma(this.props.data[i].amount)}
                        </Text>

                    </View>
                )
            }
        }
        else {
            trans.push(
                <View key={0} style={[{ flexDirection: 'row', borderColor: 'black', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dce1e3', paddingBottom: 5, paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15 }]}>
                    {/* <Text style={[{ height: 60, flex: 0.35, borderWidth: 2, borderColor: 'white', borderRadius: 30, marginTop: -5, backgroundColor: '#0abcfc' }]}><MIcon name={'alpha-' + this.props.data[i].client[0].toLowerCase()} size={70} /></Text> */}

                    {/* <Image source={require('../../assets/img/vendor-logo/shop.png')} style={[{ height: 50, flex: 0.35 }]} /> */}
                    <Text style={[{ fontFamily: 'ubuntu', fontSize: 15, marginLeft: 'auto', marginRight: 'auto' }]}>You haven't done any transactions yet.</Text>

                </View>
            )
        }
        return (

            trans
        );
    }
}
export default Transactions;