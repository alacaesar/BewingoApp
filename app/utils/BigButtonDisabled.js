import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

var styles = require('../../app/styles.js');

export default class bigButtonDisabled extends React.PureComponent{
  render(){

    return(
      <TouchableOpacity activeOpacity={1} style={[styles.bigButton, styles.disabledBackground]}>
        <Text style={styles.bigButtonText}>{this.props.title}</Text>
        <Image source={require('../../assets/images/right_arrow.png')} style={styles.bigButtonIcon} />
      </TouchableOpacity>
    )
  }
}
