import React, { useRef, useEffect, Component } from 'react';
import { Alert, TouchableOpacity, ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/AntDesign';
import AccountCard from './home/AccountCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddMoney from './addMoney/AddMoneyMainPage';
import SendToBank from './sendToBank/SendToBankMainPage';
import SendAbroad from './sendAbroad/SendAbroadMainPage';
import TransactionDetails from './transactionHistory/TransactionsHistory';
import ReceiveMoney from './receiveMoney/ReceiveMoneyMainPage';


// const Stack = createStackNavigator();


const styles = StyleSheet.create({
    image: {
        height: 44,
        resizeMode: 'contain',
    },
    background: {
        backgroundColor: '#ecf3ff',
        height: '100%',
        flexDirection: 'column'
    },
    text: {
        // fontFamily:'proxima',
        color: 'black',
    },
    name: {
        // fontWeight: '700',
        fontSize: 30,
    },
    normal: {
        fontWeight: '500',
        fontSize: 16,
        padding: 10
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
        color: '#4a4eed',

    },
    button: {
        borderRadius: 22,
        padding: 13,
        fontSize: 18,
        flex: 1,
        margin: 'auto',
        textAlign: 'center',

    },
    icon: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'white',
        padding: 10,
        width: 47,
        maxHeight: 50,
        borderRadius: 9,
    },
    iconText: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'ubuntu',
        padding: 10

    }
});


function HomeScreen({ navigation }) {
    const myIcon = <Icon name="rocket" size={30} color="#900" />;
    const transactionData = [{ date: 'Fri, 07:47 PM', client: 'Paytm', amount: 4526.03, icon: 'bank-transfer', bgcolor: '#7c00ff' },
    { date: 'Thur, 09:52 AM', client: 'Razorpay India Pvt. Ltd', amount: -760.00, icon: 'bank-transfer', bgcolor: '#9de0fc' },
    { date: 'Wed, 06:00 PM', client: 'Indian Garments Pvt. Ltd', amount: 144520.00, icon: 'shopping-outline', bgcolor: '#f4b6fa' },
    { date: 'Tues, 11:14 AM', client: 'North Indian Raw Pvt. Ltd', amount: -210.04, icon: 'food', bgcolor: '#fcd89d' },
    { date: 'May 10, 07:17 AM', client: 'Coinbase India Pvt. Ltd', amount: 1327.00, icon: 'bitcoin', bgcolor: '#b6fac6' },
    { date: 'May 09, 10:20 PM', client: 'Ezikel Electricals Pvt. Ltd', amount: 20.00, icon: 'lightbulb-outline', bgcolor: '#f0fab6' },
    { date: 'Wed, 06:00 PM', client: 'Indian Garments Pvt. Ltd', amount: -14520.00, icon: 'food', bgcolor: '#fcd89d' },
    { date: 'Tues, 11:14 AM', client: 'North Indian Raw Pvt. Ltd', amount: 210.04, icon: 'food', bgcolor: '#fcd89d' },
    { date: 'May 10, 07:17 AM', client: 'Coinbase India Pvt. Ltd', amount: -1327.00, icon: 'food', bgcolor: '#fcd89d' },
    { date: 'May 09, 10:20 PM', client: 'Ezikel Electricals Pvt. Ltd', amount: 20.00, icon: 'food', bgcolor: '#fcd89d' },
    { date: 'May 08, 01:58 PM', client: 'Rajnikant Pvt. Ltd', amount: 246.00, icon: 'food', bgcolor: '#fcd89d' }];
    return (
        <ScrollView style={[styles.background, { flexDirection: 'column' }]}>

            <View style={[{ flexDirection: 'row', flex: 1, marginTop: 30, marginLeft: 1, padding: '5%' }]}>
                <Text style={[styles.text, styles.name, { flex: 1.5, fontFamily: 'ubuntu' }]}>Hi, Prince</Text>
                <Image style={[styles.image, {
                    flex: 0.2, borderWidth: 2, borderRadius: 26, marginTop: -5,
                }]} source={require('../assets/img/user/user.png')} />
            </View>
            <View style={[{ flex: 1 }]}>
                <AccountCard></AccountCard>
            </View>
            <View style={[{ flex: 1 }]}>
                <View>
                    <View style={[{ flexDirection: 'column', backgroundColor: 'white', marginLeft: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10, paddingTop: 18, borderRadius: 20, marginBottom: 30, elevation: 4 }]}>
                        <Text style={[{ fontFamily: 'ubuntu-med', fontSize: 20, marginLeft: 15, marginBottom: 25 }]}>
                            Payments
                        </Text>
                        <View style={[{ flexDirection: 'row', flex: 1 }]}>

                            <View style={[{ flexDirection: 'column', flex: 1 }]}>
                                <TouchableOpacity onPress={() => navigation.navigate('AddMoney')}>

                                    <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['#130f40', '#000000']}
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
                                        colors={['#130f40', '#000000']}
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
                                <TouchableOpacity onPress={() => navigation.navigate('SendToBank')}>
                                    <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['#130f40', '#000000']}
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
                                </TouchableOpacity>
                            </View>

                            <View style={[{ flexDirection: 'column', flex: 1 }]}>
                                <TouchableOpacity onPress={() => navigation.navigate('SendAbroad')}>
                                    <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['#130f40', '#000000']}
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
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[{ flexDirection: 'row', flex: 1, marginTop: 15 }]}>

                            <View style={[{ flexDirection: 'column', flex: 1 }]}>
                                <TouchableOpacity onPress={() => navigation.navigate('ReceiveMoney')}>
                                    <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['#130f40', '#000000']}
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
                                </TouchableOpacity>
                            </View>

                            <View style={[{ flexDirection: 'column', flex: 1 }]}>
                                <TouchableOpacity onPress={() => navigation.navigate('TransactionsHistory')}>
                                    <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['#130f40', '#000000']}
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
                                </TouchableOpacity>
                            </View>

                            <View style={[{ flexDirection: 'column', flex: 1 }]}>
                                <View style={[styles.icon, { flex: 1, borderColor: '#9de0fc', borderWidth: 1 }]} >
                                    <LinearGradient
                                        // Background Linear Gradient
                                        colors={['#130f40', '#000000']}
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


                </View>
            </View>
            <View style={{ flex: 2 }}>
                <View style={[]}>
                    <View>
                        <TouchableOpacity style={[{ flexDirection: 'row' }]} onPress={() => navigation.navigate('TransactionsHistory')}>
                            <Text style={[{ fontSize: 20, flex: 1, fontWeight: '500', color: '#4d4c4b', marginLeft: 15, marginBottom: 20 }]}>Transactions</Text>
                            <Icon name="arrowright" size={20} style={[{ flex: 0.1, marginRight: 10 }]} color="#4d4c4b" />
                        </TouchableOpacity>
                    </View>
                    <View style={[{ marginLeft: 10, elevation: 5, marginRight: 10, borderRadius: 10, backgroundColor: 'white', padding: 5, marginBottom: 10 }]}>

                        <Transactionslist data={transactionData} ></Transactionslist>
                    </View>
                </View>
            </View>

        </ScrollView>
    );
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
                    <View key={i} style={[{ flexDirection: 'row', borderColor: 'black', backgroundColor: 'white', borderBottomWidth: (i < (this.props.data.length < 7 ? this.props.data.length : 7) - 1 ? 1 : 0), borderBottomColor: '#dce1e3', paddingBottom: 5, height: 80, paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15 }]}>
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

const Stack = createNativeStackNavigator();

function App() {
    const ref = React.useRef(null);

    let [customFonts] = useFonts({
        'Ocrb': require('../assets/fonts/OCRB-Medium.ttf'),
        'ubuntu': require('../assets/fonts/Ubuntu-Regular.ttf'),
        'ubuntu-med': require('../assets/fonts/Ubuntu-Medium.ttf'),
        'ubuntu-bold': require('../assets/fonts/Ubuntu-Bold.ttf'),
        'ubuntu-light': require('../assets/fonts/Ubuntu-Light.ttf'),
    });

    if (!customFonts) {
        return null;
    }
    return (
        <NavigationContainer ref={ref}>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false
                    }}

                />
                <Stack.Screen
                    name="AddMoney"
                    component={AddMoney}
                    options={{
                        title: 'Add Money'
                    }}
                />
                <Stack.Screen
                    name="ReceiveMoney"
                    component={ReceiveMoney}
                    options={{
                        title: 'Receive Money'
                    }}
                />
                <Stack.Screen
                    name="SendToBank"
                    component={SendToBank}
                    options={{
                        title: 'Send To Bank'
                    }}
                />
                <Stack.Screen
                    name="SendAbroad"
                    component={SendAbroad}
                    options={{
                        title: 'Send Money Abroad '
                    }}
                />
                <Stack.Screen
                    name="TransactionsHistory"
                    component={TransactionDetails}
                    options={{
                        title: 'Transactions History'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;