
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  AsyncStorage,
  Modal,
  TouchableOpacity,
} from 'react-native';

styles = require('../app/styles.js');
Globals = require('../app/Globals.js');

import BigButton from '../app/utils/BigButton.js';

// Let's go

export default class AccountPage extends React.Component {

  _onLogoutPressed = () => {
    this.props.onLogoutPressItem();
  }

  _onClosePressed = () => {
    this.props.onClosePressItem();
  }

  render(){

    const item = Globals.user;

    return(
      <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {}}
          >
        <View style={styles.ground}>
        <View style={styles.one}></View>
        <View style={styles.container}>

          <View style={styles.one, styles.modalHeader}>
            <TouchableOpacity activeOpacity={0.8} onPress={this._onClosePressed}>
              <Image source={require('../assets/images/close.png')} style={styles.closeButton} />
            </TouchableOpacity>
          </View>

          <View style={[styles.one, styles.center]}>

          <View style={styles.input}><Text numberOfLines={1} style={[styles.small, styles.dropDownText]}>Marka: {item.brand}</Text></View>
          <View style={styles.input}><Text numberOfLines={1} style={[styles.small, styles.dropDownText]}>Bayi: {item.dlr_title}</Text></View>
          <View style={styles.input}><Text numberOfLines={1} style={[styles.small, styles.dropDownText]}>İl: {item.city}</Text></View>
          <View style={[styles.input, styles.spaceBottom]}><Text numberOfLines={1} style={[styles.small, styles.dropDownText]}>E-mail: {item.dlr_email}</Text></View>

          <BigButton onPress={this._onLogoutPressed} title='Çıkış yap' icon='../assets/images/right_arrow.png' />

          </View>

        </View>
        <View style={styles.one}></View>
        </View>
      </Modal>
    )
  }
}
