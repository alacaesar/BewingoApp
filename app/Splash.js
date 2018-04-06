import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native';
import { Permissions, Notifications } from 'expo';

styles = require('../app/styles.js');
Globals = require('../app/Globals.js');

import LoginPage from '../app/Login.js';

// Let's go

export default class SplashPage extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle:null,
    headerStyle:{ backgroundColor: '#377BCE', elevation:0, shadowOpacity:0},
  }

  state = {
    notification:{},
  };

  componentWillMount(){
    registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  componentDidMount(){
    registerForPushNotificationsAsync();
    _loadInitialState(this._routeAccordingToAsyncStorage);
  }

  _routeAccordingToAsyncStorage = (answer) => {
    if(answer == 'no')
    {
      this.props.navigation.navigate('Login');
    }
    else {
      var loginInfo = answer.split('|');

      var data = new FormData();
          data.append('user', loginInfo[0]);
          data.append('pass', loginInfo[1]);
          data.append('tkn', Globals.exponentPushToken );

      Globals.fetchURL(Globals.URLs.login,
        data,
        this._handleLoginResponse);
    }
  }

  _handleLoginResponse = (json, b) => {

    if( json == 'error' )
    {
      this.props.navigation.navigate('Login');
    }
    else {
      if(json.result == 'OK')
      {
        console.log('>>>>> logged with storage');
        Globals.user = json.user;
        this.props.navigation.navigate('List', {listings: json.data});
        //this.props.navigation.navigate('Login');
      }
      else{
        this.props.navigation.navigate('Login');
      }
    }
  }

  _handleNotification = (notification) => {
    this.setState({notification:notification});
  };

  render() {
    return (
      <View style={styles.splash}>
        <Image source={require('../assets/images/logo.png')} style={styles.splashLogo} />
        <Image source={require('../assets/images/splash.png')} style={styles.splashIcon} />
        <Text style={styles.headingText}>En trendy dijital plazaya</Text>
        <Text style={[styles.headingText, styles.bold]}>Hoş geldiniz.</Text>
      </View>
    );
  }
}

// check AsyncStorage for user login information to pass login page if found.
async function _loadInitialState(callback){
  var answer = '';
  try {
    const value = await AsyncStorage.getItem('@loginInformation');
    if (value !== null) {
      console.log('there is storage >>>>>>');
      answer = value;
     } else {
       answer = 'no';
       console.log('there is no asyncccc');
     }
   } catch (error) {
     console.log(error + 'hola');
   }
   callback(answer)
}

// Register App token for push notifications
async function registerForPushNotificationsAsync(){

  console.log("reg push nana");

  const { existingStatus } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

  console.log("token is:", token );

  Globals.exponentPushToken = token;

  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'accept-encoding': 'gzip, deflate',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "to": token,
      "badge": 0,
    })
  })

  // POST the token to our backend so we can use it to send pushes from there
  /*
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
       },
       user: {
        username: 'Brent',
       },
    }),
  });
  */
}
