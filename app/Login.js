
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  AsyncStorage,
  Keyboard,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

styles = require('../app/styles.js');
Globals = require('../app/Globals.js');

import ListPage from '../app/List.js';
import BigButton from '../app/utils/BigButton.js';

// Let's go

export default class LoginPage extends React.Component {

  static navigationOptions = {
    title: 'bewingo',
    headerTitle:<View style={styles.headerLogoHolder}><Image source={require('../assets/images/logo.png')} style={styles.logo}/></View>,
    headerStyle:{ backgroundColor: '#377BCE' },
    headerTitleStyle:{ color: '#ffffff'},
    headerLeft: null,
  }

  constructor(props){
    super(props);
    this.state = {
      user: null,
      pass: null,
      isLoading: false,
      message: '',
      stateLoaded:false,
    }
  }

  _onUserTextChanged = (event) => { this.setState({user: event.nativeEvent.text }); }
  _onPassTextChanged = (event) => { this.setState({pass: event.nativeEvent.text }); }

  _onLoginPressed = () => {
    this.setState({isLoading: true});
    Keyboard.dismiss;

    var data = new FormData();
        data.append('user', this.state.user);
        data.append('pass', this.state.pass);
        data.append('tkn', Globals.exponentPushToken );

    Globals.fetchURL(Globals.URLs.login, //+'?user='+this.state.user+'&pass='+this.state.pass+'&tkn='+Globals.exponentPushToken,
      data,
      this._handleLoginResponse);
    }

  _handleLoginResponse = (json, b) => {

    if( json == 'error' )
    {
      this.setState({
        isLoading: false,
        message: 'Hata oluştu: ' + b,
      });
    }
    else {
      if(json.result == 'OK')
      {
        this._setAsyncStorage();
        Globals.user = json.user;
        this.props.navigation.navigate('List', {listings: json.data});
      }
      else{

        console.log(json);

        this.setState({
          isLoading: false,
          message: 'E-mail adresi veya şifreniz yanlış.',
        });
      }
    }
  }

  _setAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('@loginInformation', this.state.user+'|'+this.state.pass);
    } catch (error) {
      // Error saving data
    }
  }

  componentDidMount(){

  }

  render(){

    //console.log('LoginPage.render');
    const spinner = this.state.isLoading ? <ActivityIndicator color='#377BCE' size='large' /> : null;

    return(

      <View style={styles.ground}>
      <View style={styles.one}></View>
      <View style={styles.container}>
        <TextInput autoCorrect={false} autoCapitalize='none' keyboardType='email-address' onChange={this._onUserTextChanged} /*value={this.state.loginString}*/ style={styles.input} placeholder='E-mail' underlineColorAndroid='transparent'></TextInput>
        <TextInput onChange={this._onPassTextChanged} style={[styles.input, styles.spaceBottom]} secureTextEntry={true} placeholder='Şifre' underlineColorAndroid='transparent'></TextInput>
        <BigButton onPress={this._onLoginPressed} title='Login' icon='../assets/images/right_arrow.png' />
        <View style={styles.messageWrapper}><Text style={[styles.small, styles.message]}>{this.state.message}</Text></View>
        <View style={styles.spinner}>{spinner}</View>
      </View>
      <View style={styles.one}></View>
      </View>

    )
  }
}
