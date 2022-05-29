import React, { useRef, useState, useEffect, Component } from 'react';
import { Alert, TouchableOpacity, Modal, BackHandler, Image, View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import App from './Home';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setmessage] = useState('Error');
    const [button, setbutton] = useState('OK');
    const [title, settitle] = useState('Error');

    const [email, onChangeEmail] = React.useState('');

    const [password, onChangePassword] = React.useState('');

    const loginUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://43.204.71.211:3000/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.code == 200) {
                    setmessage('Email id and password matched');
                    settitle('Logged In');
                    setbutton('Home');
                    setModalVisible(!modalVisible)
                    console.log(result.data.name)
                }
                else if (result.code == 401) {
                    setmessage(result.message);
                    settitle('Request Failed');
                    setbutton('Cancel');
                    setModalVisible(!modalVisible)
                    console.log(result.message)
                }
                else if (result.code == 402) {
                    setmessage(result.message);
                    settitle('Invalid Credentials');
                    setbutton('OK');
                    setModalVisible(!modalVisible)
                    console.log(result.message)
                }
                else if (result.code == 409) {
                    setmessage(result.message);
                    settitle('Network Error');
                    setbutton('OK');
                    setModalVisible(!modalVisible)
                    console.log(result.message)
                }
                else {
                    setmessage('Unknown Error! Please try again later');
                    settitle('Error');
                    setbutton('OK');
                    setModalVisible(!modalVisible)
                    console.log(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }


    return (
        <ScrollView style={[styles.background, { padding: 20 }]}>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    // marginTop: 22
                }]}>
                    <View style={[{
                        // margin: 20,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        padding: 20,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        width: '80%',
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }]}>
                        <Text style={[{ fontFamily: 'ubuntu-med', fontSize: 20 }]}>{title}</Text>
                        <Text style={[{ fontFamily: 'ubuntu', fontSize: 15, marginTop: 20, marginBottom: 15 }]}>{message}</Text>
                        <TouchableOpacity
                            style={[{
                                borderRadius: 8,
                                padding: 10,
                                width: 100,
                                marginTop: 15,
                                elevation: 2
                            }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <LinearGradient
                                // Background Linear Gradient
                                colors={['#130f40', '#000000']}
                                style={[{
                                    position: 'absolute',
                                    left: 0,
                                    // width: 47,
                                    height: 40,
                                    width: 100,
                                    borderRadius: 8,
                                    right: 0,
                                }]}
                            />
                            <Text style={[{ color: 'white', fontFamily: 'ubuntu-med', fontSize: 17, textAlign: 'center' }]}>{button}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
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
                    loginUser()
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





        </ScrollView>
    );
}

function SignUp({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalOtpVisible, setOtpModalVisible] = useState(false);
    const [closeModal, setcloseModal] = useState(false);
    const [message, setmessage] = useState('Error');
    const [otpMessage, setotpMessage] = useState('');
    const [button, setbutton] = useState('OK');
    const [title, settitle] = useState('Error');
    const [email, onChangeEmail] = React.useState('');
    const [name, onChangeName] = React.useState('');
    const [mobile, onChangeMobile] = React.useState('');
    const [otp, onChangeOtp] = React.useState('');
    const [otpId, onChangeOtpId] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const [cnfmpassword, onChangecnfmPassword] = React.useState('');

    const submitData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": name,
            "email": email,
            "phone": mobile,
            "profilePic": "abc.png",
            "password": password,
            "pan": "ABC4575SDG",
            "aadhar": "46191256318"
        });


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://43.204.71.211:3000/send-data", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.code == 200) {
                    setotpMessage('');
                    setOtpModalVisible(!modalOtpVisible)
                    onChangeOtpId(result.otpId);
                    setmessage(result.message);
                    settitle('Enter OTP');
                    setbutton('OK');
                    setModalVisible(!modalVisible)
                    console.log(result.message)

                }
                else if (result.code == 409) {
                    setmessage(result.message);
                    settitle('Error');
                    setbutton('OK');
                    setModalVisible(!modalVisible)
                    console.log(result.message)
                }
                else {
                    setmessage('Unknown Error! Please try again later.');
                    settitle('Error');
                    setbutton('OK');
                    setModalVisible(!modalVisible)
                    console.log(result.message)

                }
            })
            .catch(error => {
                setmessage('Unknown Error! Please try again later.');
                settitle('Error');
                setbutton('OK');
                setModalVisible(!modalVisible)
                console.log(result.message)
                console.log('error', error)
            });
    }
    function verifyOtp() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            otpId,
            otp
        });


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://43.204.71.211:3000/verify-otp", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.code == 200) {
                    setmessage(result.message);
                    setotpMessage('');
                    setOtpModalVisible(!modalOtpVisible)
                    settitle('Congratulations');
                    setbutton('Home');
                    // setModalVisible(!modalVisible)
                    console.log(result.message)

                }
                else if (result.code == 409) {
                    setotpMessage(result.message);
                    // settitle('Error');
                    // setbutton('OK');
                    // setModalVisible(!modalVisible)
                    console.log(result.message)
                }
                else if (result.code == 408) {
                    setotpMessage(result.message);
                    // settitle('OTP Expired');
                    // setbutton('OK');
                    // setModalVisible(!modalVisible)
                    console.log(result.message)
                }
                else if (result.code == 429) {
                    setotpMessage(result.message);
                    // settitle('OTP Expired');
                    // setbutton('OK');
                    // setModalVisible(!modalVisible)
                    setcloseModal(!closeModal)
                    console.log(result.message)
                }
                else {
                    setotpMessage('Unknown Error! Please try again later.');
                    // settitle('Error');
                    // setbutton('OK');
                    // setModalVisible(!modalVisible)
                    console.log(result.message)

                }
            })
            .catch(error => {
                setotpMessage('Unknown Error! Please try again later.');
                // settitle('Error');
                // setbutton('OK');
                // setModalVisible(!modalVisible)
                console.log(result.message)
                console.log('error', error)
            });
    }
    const Bold = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
    return (
        <ScrollView style={[styles.background, { padding: 20 }]}>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    setOtpModalVisible(!modalOtpVisible);
                }}
            >
                <View style={[{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    // marginTop: 22
                }]}>
                    <View style={[{
                        // margin: 20,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        padding: 20,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        width: '80%',
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }]}>
                        <Text style={[{ fontFamily: 'ubuntu-med', fontSize: 20 }]}>{title}</Text>
                        <Text style={[{ fontFamily: 'ubuntu', fontSize: 15, marginTop: 20, marginBottom: 15, textAlign: 'center' }]}>{message}</Text>
                        {modalOtpVisible ? <TextInput placeholder='OTP' keyboardType='number-pad' placeholderTextColor='black' value={otp} onChangeText={otp => onChangeOtp(otp)} maxLength={6} style={[{ borderRadius: 8, marginBottom: 20, marginTop: 10, width: 150, textAlign: 'center', borderWidth: 1, borderColor: 'black', color: 'black', fontSize: 20, paddingLeft: 10, paddingRight: 10, fontFamily: 'ubuntu', height: 45 }]} /> : null}
                        {otpMessage.length > 0 ? <Text style={[{ color: 'red', marginLeft: 10, marginTop: 5 }]}>{otpMessage}</Text> : null}


                        <TouchableOpacity
                            style={[{
                                borderRadius: 8,
                                padding: 10,
                                width: 100,
                                marginTop: 15,
                                elevation: 2
                            }]}
                            onPress={() => {
                                modalOtpVisible ? (closeModal ? (setModalVisible(!modalVisible), setOtpModalVisible(!modalOtpVisible), setotpMessage(''), onChangeOtp(''), setcloseModal(!closeModal)) : verifyOtp()) : (setModalVisible(!modalVisible)
                                )


                            }}

                            disabled={modalOtpVisible ? (otp.length == 6 ? false : true) : false}

                        >
                            <LinearGradient
                                // Background Linear Gradient
                                colors={['#130f40', '#000000']}
                                style={[{
                                    position: 'absolute',
                                    left: 0,
                                    // width: 47,
                                    height: 40,
                                    width: 100,
                                    borderRadius: 8,
                                    right: 0,
                                }]}
                            />
                            <Text style={[{ color: 'white', fontFamily: 'ubuntu-med', fontSize: 17, textAlign: 'center' }]}>{button}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>



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
                <Text style={[{ color: 'red', marginLeft: 18, marginTop: (password == cnfmpassword ? -15 : 5) }]}>{(password == cnfmpassword) ? '' : '**Password and Confirm Password did not match'} </Text>

            </View>
            <View style={[{ padding: 40, marginTop: 20 }]}>
                <TouchableOpacity
                    disabled={name.length > 0 ? (mobile.length == 10 ? (email.length > 0 ? (password.length > 0 ? (password == cnfmpassword ? false : true) : true) : true) : true) : true}
                    onPress={() => {

                        submitData()

                        // save('password', password);
                        // save('email', email);
                        // save('email', email);
                        // navigation.navigate('Home')
                    }} >
                    <LinearGradient
                        // Background Linear Gradient
                        colors={name.length > 0 ? (mobile.length == 10 ? (email.length > 0 ? (password.length > 0 ? (password == cnfmpassword ? ['#130f40', '#000000'] : ['gray', 'gray']) : ['gray', 'gray']) : ['gray', 'gray']) : ['gray', 'gray']) : ['gray', 'gray']}
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

        </ScrollView>
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
