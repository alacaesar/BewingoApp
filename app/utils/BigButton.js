import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

var styles = require('../../app/styles.js');

export default class bigButton extends React.PureComponent{
  render(){
    return(
      <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress} style={styles.bigButton}>
        <Text style={styles.bigButtonText}>{this.props.title}</Text>
        <Image source={require('../../assets/images/right_arrow.png')} style={styles.bigButtonIcon} />
      </TouchableOpacity>
    )
  }
}
