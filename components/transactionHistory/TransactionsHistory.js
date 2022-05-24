import React, { useRef, useEffect, Component } from 'react';
import { FlatList, Modal, TouchableOpacity, Image, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import Transactions from '../home/Transactions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AddMoney from '../addMoney/AddMoneyMainPage';


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

const Transaction = ((item, navigation) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('TransactionDetails', { item })} style={[{ flexDirection: 'row', borderColor: 'black', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dce1e3', paddingBottom: 5, height: 80, paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15 }]}>
            {/* <Text style={[{ height: 60, flex: 0.35, borderWidth: 2, borderColor: 'white', borderRadius: 30, marginTop: -5, backgroundColor: '#0abcfc' }]}><MIcon name={'alpha-' + item.client[0].toLowerCase()} size={70} /></Text> */}

            {/* <Image source={require('../../assets/img/vendor-logo/shop.png')} style={[{ height: 50, flex: 0.35 }]} /> */}
            <View style={[{
                // marginLeft: 10,
                // marginTop: 10,
                borderRadius: 35,
                padding: 10,
                marginLeft: -4.5,
                borderWidth: 2,
                flex: 0.19,
            }]} backgroundColor={item.bgcolor} borderColor={item.bgcolor}>
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
                <MaterialCommunityIcons name={item.icon} style={[{}]} color='white' size={25} />
            </View>
            <View style={[{ flexDirection: 'column', flex: 1.2, marginLeft: 18 }]}>
                <Text style={[{ fontSize: 16, fontFamily: 'ubuntu', flex: 1 }]}>{item.client.substring(0, 20)}</Text>
                <Text style={[{ fontSize: 12, fontFamily: 'ubuntu-light', flex: 0.8 }]}>{item.date}</Text>
                <Text style={[{ fontSize: 14, fontFamily: 'ubuntu-light', flex: 0.8 }]}>Txn. ID : {item.transId}</Text>
            </View>

            <Text style={[{ color: (item.amount < 0 ? 'red' : 'green'), fontFamily: 'ubuntu', fontSize: 15, flex: 1, marginTop: 'auto', marginBottom: 'auto', textAlign: 'right', fontWeight: '500' }]}>
                {item.amount < 0 ? '- ' : '+ '}{'\u20B9'}{separateComma(item.amount)}
            </Text>

        </TouchableOpacity>
    );
});

const TransactionData = [{ date: 'Fri, 07:47 PM', client: 'Paytm', amount: 4526.03, icon: 'bank-transfer', bgcolor: '#7c00ff', transId: 'UIN158725K', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'Thur, 09:52 AM', client: 'Razorpay India Pvt. Ltd', amount: -760.00, icon: 'bank-transfer', bgcolor: '#9de0fc', transId: 'UIN1587255', method: 'CBDC', account: { name: 'CBDC Account', ending: '5863' }, },
{ date: 'Wed, 06:00 PM', client: 'Indian Garments Pvt. Ltd', amount: 144520.00, icon: 'shopping-outline', bgcolor: '#f4b6fa', transId: 'UIN1587251', method: 'CBDC', account: { name: 'CBDC Account', ending: '5863' }, },
{ date: 'Tues, 11:14 AM', client: 'North Indian Raw Pvt. Ltd', amount: -210.04, icon: 'food', bgcolor: '#fcd89d', transId: 'UIN1582725', method: 'CBDC', account: { name: 'CBDC Account', ending: '5863' }, },
{ date: 'May 10, 07:17 AM', client: 'Coinbase India Pvt. Ltd', amount: 1327.00, icon: 'bitcoin', bgcolor: '#b6fac6', transId: 'UIN1587425', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'Wed, 06:00 PM', client: 'Indian Garments Pvt. Ltd', amount: -14520.00, icon: 'food', bgcolor: '#fcd89d', transId: 'UIN1587125', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'Tues, 11:14 AM', client: 'North Indian Raw Pvt. Ltd', amount: 210.04, icon: 'food', bgcolor: '#fcd89d', transId: 'UIN1587025', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'Tues, 11:14 AM', client: 'North Indian Raw Pvt. Ltd', amount: -210.04, icon: 'food', bgcolor: '#fcd89d', transId: 'UIN1584725', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'May 10, 07:17 AM', client: 'Coinbase India Pvt. Ltd', amount: 1327.00, icon: 'bitcoin', bgcolor: '#b6fac6', transId: 'UIN1585725', method: 'CBDC', account: { name: 'CBDC Account', ending: '5863' }, },
{ date: 'Wed, 06:00 PM', client: 'Indian Garments Pvt. Ltd', amount: 144520.00, icon: 'shopping-outline', bgcolor: '#f4b6fa', transId: 'UIN5158725', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'Tues, 11:14 AM', client: 'North Indian Raw Pvt. Ltd', amount: -210.04, icon: 'food', bgcolor: '#fcd89d', transId: 'UI1N158725', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'May 10, 07:17 AM', client: 'Coinbase India Pvt. Ltd', amount: 1327.00, icon: 'bitcoin', bgcolor: '#b6fac6', transId: 'UIN1528725', method: 'CBDC', account: { name: 'CBDC Account', ending: '5863' }, },
{ date: 'May 10, 07:17 AM', client: 'Coinbase India Pvt. Ltd', amount: -1327.00, icon: 'food', bgcolor: '#fcd89d', transId: 'UIN17458725', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'May 09, 10:20 PM', client: 'Ezikel Electricals Pvt. Ltd', amount: 20.00, icon: 'food', bgcolor: '#fcd89d', transId: 'UIN1558725', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'May 09, 10:20 PM', client: 'Ezikel Electricals Pvt. Ltd', amount: 20.00, icon: 'lightbulb-outline', bgcolor: '#f0fab6', transId: 'UIN7158725', method: 'CBDC', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'Wed, 06:00 PM', client: 'Indian Garments Pvt. Ltd', amount: -14520.00, icon: 'food', bgcolor: '#fcd89d', transId: 'UIN15857725', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'Tues, 11:14 AM', client: 'North Indian Raw Pvt. Ltd', amount: 210.04, icon: 'food', bgcolor: '#fcd89d', transId: 'UIN15638725', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'May 10, 07:17 AM', client: 'Coinbase India Pvt. Ltd', amount: -1327.00, icon: 'food', bgcolor: '#fcd89d', transId: 'UIN15538725', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'May 09, 10:20 PM', client: 'Ezikel Electricals Pvt. Ltd', amount: 20.00, icon: 'food', bgcolor: '#fcd89d', transId: 'UIN15802725', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, },
{ date: 'May 08, 01:58 PM', client: 'Rajnikant Pvt. Ltd', amount: 246.00, icon: 'food', bgcolor: '#fcd89d', transId: 'UIN158715225', method: 'UPI', account: { name: 'HDFC Bank', ending: '1456' }, }];

function TransactionsHistory({ navigation }) {

    let [customFonts] = useFonts({
        'Ocrb': require('../../assets/fonts/OCRB-Medium.ttf'),
        'ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
        'ubuntu-med': require('../../assets/fonts/Ubuntu-Medium.ttf'),
        'ubuntu-bold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
        'ubuntu-light': require('../../assets/fonts/Ubuntu-Light.ttf'),
    });

    if (!customFonts) {
        return null;
    }



    return (
        <ScrollView style={[]} nestedScrollEnabled={true} >
            <View style={[{ marginLeft: 10, elevation: 5, marginTop: 10, marginRight: 10, borderRadius: 10, backgroundColor: 'white', padding: 5, marginBottom: 10, flex: 1 }]}>
                <FlatList
                    data={TransactionData}
                    renderItem={({ item }) => { return Transaction(item, navigation) }}
                    keyExtractor={item => item.transId}

                />

                {/* <Transactionslist data={itemData} ></Transactionslist> */}
                {/* {Transactionslist(itemData, { navigation })} */}
            </View>
        </ScrollView>
    );


}

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
const myIcon = <Icon name="verified" size={30} color="#900" />;

const TransactionDetail = (props) => {


    const { date, client, method, account, amount, icon, bgcolor, transId } = props.route.params.item;
    return (
        <ScrollView style={[styles.background]}>
            <View style={[{ backgroundColor: 'white', marginLeft: 5, marginTop: 10, marginRight: 5, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 18, borderRadius: 10, marginBottom: 40, elevation: 4 }]}>
                <View style={[{ flexDirection: 'row', borderBottomColor: bgcolor, borderBottomWidth: 1, paddingBottom: 40 }]}>
                    <View style={[{ flex: 1, flexDirection: 'column' }]}>
                        <Text style={[{ flex: 1, fontFamily: 'ubuntu-med', fontSize: 20 }]}>
                            {amount < 0 ? 'Paid to,' : 'Received from, '}
                        </Text>
                        <Text style={[{ flex: 1, marginTop: 4, fontFamily: 'ubuntu-bold', fontSize: 25, borderColor: bgcolor }]}>
                            {client}
                        </Text>

                    </View>
                    <View style={[{
                        // marginLeft: 10,
                        // marginTop: 10,
                        borderRadius: 35,
                        padding: 10,
                        marginLeft: -4.5,
                        borderWidth: 2,
                        maxWidth: 50,
                        flex: 1,
                    }]} backgroundColor={bgcolor} borderColor={bgcolor}>
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
                        <MaterialCommunityIcons name={icon} style={[{}]} color='white' size={25} />
                    </View>

                </View>
                <View style={[{ borderBottomColor: bgcolor, borderBottomWidth: 1, paddingBottom: 40, paddingTop: 20 }]}>
                    <Text style={[{ fontFamily: 'ubuntu', fontSize: 17, marginBottom: 10 }]}>
                        Amount
                    </Text>
                    <View style={[{ flexDirection: 'row' }]}>
                        <Text style={[{ fontFamily: 'ubuntu-bold', fontSize: 25, }]}>
                            {'\u20B9'}{separateComma(amount)}
                        </Text>
                        <Text style={[{ marginTop: 2, marginRight: 'auto' }]}>
                            {' '}<Icon name="verified" size={20} color="green" />
                        </Text>

                    </View>
                    <Text style={[{ marginBottom: 5, fontFamily: 'ubuntu', fontSize: 18, marginTop: 10 }]}>
                        Transaction ID :  {transId}
                    </Text>
                    <Text style={[{ marginBottom: 5, fontFamily: 'ubuntu', fontSize: 18, }]}>
                        {amount < 0 ? 'Paid at' : 'Received at'} :  {date}
                    </Text>
                    <Text style={[{ marginBottom: 10, fontFamily: 'ubuntu', fontSize: 18, }]}>
                        {'Transaction Handle'} :  {method ? method : 'Others'}
                    </Text>


                </View>
                <View style={[{ borderBottomColor: bgcolor, borderBottomWidth: 1, paddingBottom: 40, paddingTop: 20 }]}>
                    <Text style={[{ fontFamily: 'ubuntu', fontSize: 17, marginBottom: 10 }]}>
                        {amount < 0 ? 'Paid from' : 'Received in'}
                    </Text>
                    <View style={[{ flexDirection: 'row' }]}>
                        <Text style={[{ fontFamily: 'ubuntu-bold', fontSize: 25, }]}>
                            {account.name}
                        </Text>
                        <Text style={[{ marginTop: 2, marginRight: 'auto' }]}>
                            {' '}<Icon name="verified" size={20} color="green" />
                        </Text>

                    </View>
                    <Text style={[{ marginBottom: 5, fontFamily: 'ubuntu', fontSize: 18, marginTop: 10 }]}>
                        ending with xx{account.ending}
                    </Text>
                    {method == 'UPI' ?
                        <Text style={[{ marginBottom: 10, fontFamily: 'ubuntu', fontSize: 18, }]}>
                            UPI Id : abc@oksbi
                        </Text> : null}


                </View>
                <View style={[{ flexDirection: 'row', paddingTop: 20, paddingBottom: 20 }]}>
                    <TouchableOpacity style={[{
                        // marginLeft: 10,
                        // marginTop: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingLeft: 20,
                        paddingRight: 20,
                        padding: 10,

                    }]} backgroundColor={bgcolor} borderColor={bgcolor}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#130f40', '#000000']}
                            style={[{
                                position: 'absolute',
                                left: 0,
                                borderRadius: 8,
                                right: 0,
                                height: 45,
                            }]}
                        />
                        <Text style={[{ fontFamily: 'ubuntu', fontSize: 20, color: 'white' }]}>
                            Share <MaterialCommunityIcons name='share' size={20} />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{
                        // marginLeft: 10,
                        // marginTop: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                    }]} backgroundColor={bgcolor} borderColor={bgcolor}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#130f40', '#000000']}
                            style={[{
                                position: 'absolute',
                                left: 0,
                                borderRadius: 8,
                                right: 0,
                                height: 45,
                            }]}
                        />
                        <Text style={[{ fontFamily: 'ubuntu', fontSize: 20, color: 'white' }]}>
                            Save <MaterialCommunityIcons name='download' size={20} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>


        </ScrollView>
    );

}

const Stack = createNativeStackNavigator();

function TransactionDetails() {

    const ref = React.useRef(null);


    return (
        <NavigationContainer ref={ref} independent={true}>
            <Stack.Navigator initialRouteName={'Home'}>
                <Stack.Screen
                    name="Home"
                    component={TransactionsHistory}
                    options={
                        { headerShown: false }
                    }
                />
                <Stack.Screen
                    name="TransactionDetails"
                    component={TransactionDetail}
                    options={
                        {
                            title: 'Details',
                            headerShown: false
                        }
                    }
                    initialParams={{ transId: '42' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default TransactionDetails;
