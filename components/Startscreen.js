import React, {useRef, useEffect, Component } from "react";
import {Animated, Image, View, Text, StyleSheet } from "react-native";
import Log from "./LoginPage";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import 'react-native-gesture-handler';



class Screen extends Component {
  render() {
    return (
        <View style={[styles.container, styles.background]}>
            <FadeInView style={{margin:'auto'}}>
            <Text style={styles.text}>IndiPay</Text>
            <Image source={require('../assets/logo.png')} style={styles.image}/>
            </FadeInView>
        </View>
        
    );
  }
}


const AppNavigator = createStackNavigator (  
  {  
      StartScreen: {screen: Screen,
          navigationOptions: {
              headerShown: false,
          }},  
      NewLogin: {screen:Log,
          navigationOptions: {
              headerShown: false,
          }  }
  }
);  


const AppContainer = createAppContainer(AppNavigator);  
export default class Start extends React.Component {  
    render() {  
        return <AppContainer />;  
    }  
}  

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 4000,
        }
      ).start();
    }, [fadeAnim])
  
    return (
      <Animated.View  
                     // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    background:{
      width:'100%',
      height:'100%',
      backgroundColor:'white',
      // margin:'10%'
    },
    image:{
      width:100,
      height:100,
      margin:'auto',
    //   marginTop:0
  
    },
    text:{
      marginLeft:'auto',
      marginRight:'auto',
      fontSize:20,
    //   marginBottom:0
    }
  
  });