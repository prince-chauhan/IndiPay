import React, { useRef, useEffect, Component } from 'react';
import { Alert, TouchableOpacity, BackHandler, Image, View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import App from './Home';
import TransactionDetails from './transactionHistory/TransactionsHistory';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';


async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        alert('hi' + result)
        return result
    } else {
        alert('null')
    }
}

function Login({ navigation }) {

    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    const [email, onChangeEmail] = React.useState('');

    const [password, onChangePassword] = React.useState('');
    return (
        <View style={[styles.background, { padding: 20 }]}>
            <View style={[{ marginTop: 2, marginTop: 50, flexDirection: 'row' }]}>

                <View style={[{
                    position: 'absolute', width: '100%'
                }]}>
                    <Image source={require('../assets/img/logo3.png')} style={[{ height: 70, marginTop: -20, marginBottom: 'auto', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', }]} resizeMode='contain' />
                </View>
                <TouchableOpacity onPress={() => backAction()} >
                    <View style={[{ borderColor: '#000000', borderWidth: 1, padding: 6, maxWidth: 40, maxHeight: 40, borderRadius: 8, }]}>
                        <MaterialCommunityIcons color='black' name='keyboard-backspace' size={25} />
                    </View>
                </TouchableOpacity>

            </View>
            <View style={[{ padding: 20, marginTop: 50, }]}>

                <Text style={[{ color: 'black', textAlign: 'center', fontFamily: 'ubuntu-bold', fontSize: 40, marginTop: 5 }]}>Login</Text>
            </View>
            <View style={[{ padding: 20 }]}>

                <Text style={[{ color: (email.length > 0 ? 'black' : 'transparent') }]}>Email </Text>
                <TextInput placeholder='Email' keyboardType='email-address' placeholderTextColor='black' value={email} onChangeText={email => onChangeEmail(email)} style={[{ borderRadius: 2, borderBottomWidth: 1, borderColor: 'black', color: 'black', fontSize: 20, paddingLeft: 10, fontFamily: 'ubuntu', height: 50 }]} />

                <Text style={[{ color: (password.length > 0 ? 'black' : 'transparent'), marginTop: 20 }]}>Password </Text>
                <TextInput placeholder='Password' secureTextEntry={true} placeholderTextColor='black' value={password} onChangeText={password => onChangePassword(password)} style={[{ borderRadius: 2, borderBottomWidth: 1, borderColor: 'black', color: 'black', fontSize: 20, paddingLeft: 10, fontFamily: 'ubuntu', height: 50 }]} />

                <View style={[{ flexDirection: 'row', marginTop: 20 }]}>

                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}><Text style={[{ fontFamily: 'ubuntu-med', fontSize: 15, color: '#0b58e5', textAlign: 'center' }]}>Forgot Password?</Text></TouchableOpacity>

                </View>
            </View>
            <View style={[{ padding: 40, marginTop: 40 }]}>
                <TouchableOpacity onPress={() => {
                    var res;
                    res = getValueFor('email');
                    console.log(res)
                    // Alert.alert(res)
                    // navigation.push('Home')
                }} >
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
                    <Text style={[styles.buttontext, {
                        color: 'white'
                    }]}> Log In</Text></TouchableOpacity>


            </View>

            <View style={[{ paddingLeft: 40, flexDirection: 'row', paddingRight: 40, }]}>
                <View style={[{ flex: 1, marginTop: 'auto', marginBottom: 'auto', backgroundColor: 'black', height: 2 }]}></View>
                <Text style={[{ flex: 0.5, fontFamily: 'ubuntu-bold', fontSize: 15, textAlign: 'center' }]}>OR</Text>
                <View style={[{ flex: 1, backgroundColor: 'black', height: 2, marginTop: 'auto', marginBottom: 'auto', }]}></View>
            </View>

            <View style={[{ padding: 40 }]}>
                {/* <Text style={[{ fontFamily: 'ubuntu-med', fontSize: 15, color: 'black', textAlign: 'center' }]}>Don't have an account?</Text> */}
                <TouchableOpacity onPress={() => navigation.push('SignUp')} style={[{ marginTop: 0 }]}>
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
                    <Text style={[styles.buttontext, {
                        color: 'white'
                    }]}> Register</Text></TouchableOpacity>


            </View>





        </View>
    );
}

function SignUp({ navigation }) {

    const [email, onChangeEmail] = React.useState('');
    const [name, onChangeName] = React.useState('');
    const [mobile, onChangeMobile] = React.useState('');

    const [password, onChangePassword] = React.useState('');

    const [cnfmpassword, onChangecnfmPassword] = React.useState('');
    return (
        <View style={[styles.background, { padding: 20 }]}>
            <View style={[{ marginTop: 2, marginTop: 50, flexDirection: 'row' }]}>
                <View style={[{
                    position: 'absolute', width: '100%'
                }]}>
                    <Image source={require('../assets/img/logo3.png')} style={[{ height: 70, marginTop: -20, marginBottom: 'auto', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', }]} resizeMode='contain' />
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <View style={[{ borderColor: '#000000', borderWidth: 1, padding: 6, maxWidth: 40, maxHeight: 40, borderRadius: 8, }]}>
                        <MaterialCommunityIcons color='black' name='keyboard-backspace' size={25} />
                    </View>
                </TouchableOpacity>

            </View>
            <View style={[{ padding: 20, marginTop: 40, }]}>

                <Text style={[{ color: 'black', textAlign: 'center', fontFamily: 'ubuntu-bold', fontSize: 40, marginTop: 5 }]}>Register</Text>
            </View>
            <View style={[{ padding: 20 }]}>

                <Text style={[{ color: (name.length > 0 ? 'black' : 'transparent') }]}>Name </Text>
                <TextInput placeholder='Name' keyboardType='default' placeholderTextColor='black' value={name} onChangeText={name => onChangeName(name)} style={[{ borderRadius: 2, borderBottomWidth: 1, borderColor: 'black', color: 'black', fontSize: 20, paddingLeft: 10, fontFamily: 'ubuntu', height: 50 }]} />

                <Text style={[{ color: (mobile.length > 0 ? 'black' : 'transparent'), marginTop: 10 }]}>Mobile Number </Text>
                <TextInput placeholder='Mobile' maxLength={10} keyboardType='number-pad' placeholderTextColor='black' value={mobile} onChangeText={mobile => onChangeMobile(mobile)} style={[{ borderRadius: 2, borderBottomWidth: 1, borderColor: 'black', color: 'black', fontSize: 20, paddingLeft: 10, fontFamily: 'ubuntu', height: 50 }]} />

                <Text style={[{ color: (email.length > 0 ? 'black' : 'transparent'), marginTop: 10 }]}>Email </Text>
                <TextInput placeholder='Email' keyboardType='email-address' placeholderTextColor='black' value={email} onChangeText={email => onChangeEmail(email)} style={[{ borderRadius: 2, borderBottomWidth: 1, borderColor: 'black', color: 'black', fontSize: 20, paddingLeft: 10, fontFamily: 'ubuntu', height: 50 }]} />

                <Text style={[{ color: (password.length > 0 ? 'black' : 'transparent'), marginTop: 10 }]}>Password </Text>
                <TextInput placeholder='Password' secureTextEntry={true} placeholderTextColor='black' value={password} onChangeText={password => onChangePassword(password)} style={[{ borderRadius: 2, borderBottomWidth: 1, borderColor: 'black', color: 'black', fontSize: 20, paddingLeft: 10, fontFamily: 'ubuntu', height: 50 }]} />

                <Text style={[{ color: (cnfmpassword.length > 0 ? 'black' : 'transparent'), marginTop: 10 }]}>Confirm Password </Text>
                <TextInput placeholder='Confirm Password' secureTextEntry={true} placeholderTextColor='black' value={cnfmpassword} onChangeText={cnfmpassword => onChangecnfmPassword(cnfmpassword)} style={[{ borderRadius: 2, borderBottomWidth: 1, borderColor: 'black', color: 'black', fontSize: 20, paddingLeft: 10, fontFamily: 'ubuntu', height: 50 }]} />

            </View>
            <View style={[{ padding: 40, marginTop: 20 }]}>
                <TouchableOpacity onPress={() => {
                    Alert.alert(email, password);
                    save('email', {
                        'email': email,
                        'password': password,
                        'mobile': mobile,
                        'name': name
                    });
                    // save('password', password);
                    // save('email', email);
                    // save('email', email);
                    // navigation.navigate('Home')
                }} >
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
                    <Text style={[styles.buttontext, {
                        color: 'white'
                    }]}> Register</Text></TouchableOpacity>


            </View>

        </View>
    );
}


function ForgetPassword({ navigation }) {

    const [email, onChangeEmail] = React.useState('');

    return (
        <View style={[styles.background, { padding: 20 }]}>
            <View style={[{ marginTop: 2, marginTop: 50, flexDirection: 'row' }]}>
                <View style={[{
                    position: 'absolute', width: '100%'
                }]}>
                    <Image source={require('../assets/img/logo3.png')} style={[{ height: 70, marginTop: -20, marginBottom: 'auto', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', }]} resizeMode='contain' />
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <View style={[{ borderColor: '#000000', borderWidth: 1, padding: 6, maxWidth: 40, maxHeight: 40, borderRadius: 8, }]}>
                        <MaterialCommunityIcons color='black' name='keyboard-backspace' size={25} />
                    </View>
                </TouchableOpacity>

            </View>
            <View style={[{ padding: 20, marginTop: 40, }]}>

                <Text style={[{ color: 'black', textAlign: 'center', fontFamily: 'ubuntu-bold', fontSize: 40, marginTop: 5 }]}>Forget Password</Text>
            </View>
            <View style={[{ padding: 20 }]}>


                <Text style={[{ color: (email.length > 0 ? 'black' : 'transparent'), marginTop: 10 }]}>Email </Text>
                <TextInput placeholder='Email' keyboardType='email-address' placeholderTextColor='black' value={email} onChangeText={email => onChangeEmail(email)} style={[{ borderRadius: 2, borderBottomWidth: 1, borderColor: 'black', color: 'black', fontSize: 20, paddingLeft: 10, fontFamily: 'ubuntu', height: 50 }]} />


            </View>
            <View style={[{ padding: 40, marginTop: 20 }]}>
                <TouchableOpacity onPress={() => navigation.navigate('LinkSent', { email })} >
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
                    <Text style={[styles.buttontext, {
                        color: 'white'
                    }]}> Reset Password</Text></TouchableOpacity>


            </View>

        </View>
    );
}


function LinkSent({ navigation, route }) {

    const email = route.params.email;
    return (
        <View style={[styles.background, { padding: 20 }]}>
            <View style={[{ marginTop: 2, marginTop: 50, flexDirection: 'row' }]}>
                <View style={[{
                    position: 'absolute', width: '100%'
                }]}>
                    <Image source={require('../assets/img/logo3.png')} style={[{ height: 70, marginTop: -20, marginBottom: 'auto', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', }]} resizeMode='contain' />
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <View style={[{ borderColor: '#000000', borderWidth: 1, padding: 6, maxWidth: 40, maxHeight: 40, borderRadius: 8, }]}>
                        <MaterialCommunityIcons color='black' name='keyboard-backspace' size={25} />
                    </View>
                </TouchableOpacity>

            </View>
            <View style={[{ padding: 20, marginLeft: 20, marginRight: 20, marginTop: 80, borderWidth: 1, borderRadius: 8 }]}>

                <Text style={[{ color: 'black', textAlign: 'center', fontFamily: 'ubuntu-bold', fontSize: 22, marginTop: 5 }]}>Check your inbox</Text>
                <View style={[{}]}>
                    <Text style={[{ color: 'black', fontFamily: 'ubuntu', textAlign: 'center', fontSize: 18, marginTop: 20 }]}>We have successfully sent an email with a temporary reset password link to your registered mail

                        <Text style={[{ color: 'black', fontFamily: 'ubuntu-bold', textAlign: 'center', fontSize: 18, }]}> {email.substring(0, 5)}xxxx{email.substring((email.indexOf('@')), email.length)}</Text>

                        <Text style={[{ color: 'black', fontFamily: 'ubuntu', textAlign: 'center', fontSize: 18, }]}>. The link will be expired after 4 hours.</Text></Text>

                </View>
            </View>
            <View style={[{ padding: 40, marginTop: 20 }]}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} >
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
                    <Text style={[styles.buttontext, {
                        color: 'white'
                    }]}> Go Back To Login</Text></TouchableOpacity>


            </View>

        </View>
    );
}

const Stack = createNativeStackNavigator();


function LoginApp() {
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
        <NavigationContainer ref={ref} independent={true}>
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen
                    name="LoginScreen"
                    component={Login}
                    options={{
                        headerShown: false
                    }}

                />
                <Stack.Screen
                    name="Home"
                    component={App}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                        headerShown: false,
                        // presentation: 'transparentModal'
                    }}
                />
                <Stack.Screen
                    name="ForgotPass"
                    component={ForgetPassword}
                    options={{
                        headerShown: false,
                        // presentation: 'transparentModal'
                    }}
                />

                <Stack.Screen
                    name="LinkSent"
                    component={LinkSent}
                    options={{
                        headerShown: false,
                        // presentation: 'transparentModal'
                    }}
                    initialParams={{ email: '42' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default LoginApp;


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
        backgroundColor: 'white',
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
        borderRadius: 8,
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
