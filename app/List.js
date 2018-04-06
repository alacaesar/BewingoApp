
import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Button,
  AsyncStorage,
  BackHandler,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

styles = require('../app/styles.js');
Globals = require('../app/Globals.js');

import DetailPage from '../app/Detail';
import AccountPage from '../app/Account.js';

// Let's go

var filters = [{index:0, title:'Tüm Talepler'}, {index:1, title:'Yeni Talepler'}, {index:2, title:'Kapanan Talepler'}];

export default class ListPage extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: 'bewingo',
      headerRight: (
        <TouchableOpacity activeOpacity={0.8} onPress={() => setParams({mode: true})}>
          <View style={styles.headerAccountButton}>
            <Image source={require('../assets/images/settings.png')} style={styles.settingsIcon} />
          </View>
        </TouchableOpacity>
      ),
      headerTitle:<View style={styles.headerLogoHolder}><Image source={require('../assets/images/logo.png')} style={styles.logo}/></View>,
      headerStyle:{ backgroundColor: '#377BCE'},
      headerTitleStyle:{ color: '#ffffff'},
      headerLeft: null,
      headerBackTitle: null,
      gesturesEnabled: false,
    };
  };

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      message: 'Lütfen bekleyin...',
      listLoaded: false,
      data: null,
      originalData: null,
      mode: 'none',
      filter: 0,
      disabled: false,
    }
  }

  _callListData = () => {
    this.state.listLoaded = true;
    var data = new FormData();
        data.append('ct', 0);

    Globals.fetchURL(Globals.URLs.list, data, this._handleListResponse);
  }

  _handleListResponse = (json, b) => {
    if( json == 'error' )
    {
      this.setState({
        isLoading: false,
        message: 'Hata oluştu: ' + b,
      })
    }
    else {
      this.setState({isLoading: false});
      if(json.result == 'OK')
      {
        Globals.response = json.data;
        this.setState({
          message: json.news + ' adet yeni teklif talebi var.',
          data: json.data,
          originalData: json.data,
        })

        this._onFilterPress(this.state.filter);
      }
      else {
        this.setState({
          isLoading: false,
          message: 'Size uygun yeni teklif talebi şimdilik bulunmuyor. Kısa süre sonra tekrar deneyin.',
        })
      }
    }
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => {
    return(
      <ListItem item={item} index={index} onPressItem={this._onPressItem} />
    )
  }

  _onPressItem = (index) => {
    this.props.navigation.navigate('Detail', {sequence: index, refresh: this._onRefresh});
  }

  _onRefresh = () => {
    this._callListData();
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
    this._callListData();
  }

  _handleBackButton(){
    return true;
  }

  _closeModal = () => {
    this.props.navigation.setParams({mode: false});
  }

  _callLogout = () => {
    Globals.fetchURL(Globals.URLs.logout, {}, this._handleLogoutResponse);
    this._closeModal();
    setTimeout(() => { this.props.navigation.navigate('Login'); }, 333);
  }

  _handleLogoutResponse = (json, b) => {
    if( json != 'error' )
    {
      if(json.result == 'OK')
        AsyncStorage.removeItem('@loginInformation', (err) => {});
    }
  };

  _onFilterPress = (name) => {
    var arr = []
    if(name == 0){
      arr = this.state.originalData;
    }
    else if(name == 1){
      for (let item of this.state.originalData)
      {
        if(item.ofr_id == null && item.rqs_status == 1)
          arr.push(item);
      }
    }
    else if(name == 2){
      for(let item of this.state.originalData)
      {
        if(item.rqs_status == 0)
          arr.push(item);
      }
    }

    this.setState({
      data: arr,
      filter: name,
    });
  }

  render(){

    const { params } = this.props.navigation.state;
    var bool = params.filters == true ? true : false;

    var modal = <AccountPage onLogoutPressItem={this._callLogout} onClosePressItem={this._closeModal}  modalVisible={bool} />;

    //this.state.listLoaded == false ? this._callListData() : null;

    const spinner = this.state.isLoading ? <ActivityIndicator size='large'/> : null;
    const listHeader = <View style={styles.listHeader}>
                          <Text style={[styles.small, styles.centerText]}>{this.state.message}</Text>
                       </View>;
/*
    let tabs = [];
    for( item in filters )
    {
      var selected = this.state.filter;
      tabs.push(<TabButton name={item.index} selected={item.index == selected ? true : false} title=item.title onPressItem={this._onFilterPress} />);
    }
*/
    return(
      <View style={[styles.one, styles.defaultBackground]}>
        {spinner}
        <FlatList data={this.state.data} keyExtractor={this._keyExtractor} renderItem={this._renderItem} refreshing={false} onRefresh={this._onRefresh} ListHeaderComponent={listHeader} />
        <View style={styles.footerTabsHolder}>
          <TabButton name={0} selected={this.state.filter == 0 ? true : false} title='Tüm Talepler' onPressItem={this._onFilterPress} />
          <TabButton name={1} selected={this.state.filter == 1 ? true : false} title='Yeni Talepler' onPressItem={this._onFilterPress} />
          <TabButton name={2} selected={this.state.filter == 2 ? true : false} title='Kapanan Talepler' onPressItem={this._onFilterPress} />
        </View>
        {modal}
      </View>
    )
  }
}

class TabButton extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.name);
  }
  render() {
    let textline = this.props.selected == true ? <Text style={[styles.footerTabText, styles.footerTabTextSelected]}>{this.props.title}</Text> : <Text style={styles.footerTabText}>{this.props.title}</Text>;
    return(
      <TouchableOpacity activeOpacity={0.8} style={styles.one} onPress={this._onPress}>
        <View style={[styles.one, styles.footerTab]}>
          {textline}
        </View>
      </TouchableOpacity>
    )
  };
}

class ListItem extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {

    const item = this.props.item;
    const qoute = item.ofr_id != null ?
                    <View style={styles.one, styles.qouted}>
                      <Text style={styles.small}>Verilen teklif: {Globals.numberToMoney(item.ofr_price)}</Text>
                      <View style={styles.rightAlign}>
                        <Text style={styles.greyText} numberOfLines={1}>{item.ofr_ago}</Text>
                      </View>
                    </View> : null;
    const large = item.ofr_id != null ? styles.requestLarge : null;
    const icon = item.rqs_status == 0 ? <Image source={require('../assets/images/closed.png')} style={styles.checkIcon}/>
                                      : item.ofr_id != null ? <Image source={require('../assets/images/check.png')} style={styles.checkIcon}/>
                                     : <View style={styles.newIcon}><Text style={styles.newIconText}>Yeni</Text></View>;

    const desc = item.rqs_text != null ? item.rqs_text : 'Renk tercihi: ' + item.rqs_color;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this._onPress}>
      <View style={[styles.request, large]}>
        <View style={styles.requestLeft}>
          {icon}
        </View>
        <View style={styles.requestRight}>
          <View style={styles.one}>
          <Text style={styles.medium} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.small} numberOfLines={2}>{desc}</Text>
          </View>
          <View style={styles.requestLocation}>
            <Image source={require('../assets/images/location.png')} style={styles.locationIcon} />
            <Text style={styles.blueText}>{item.cty_title}</Text>
            <View style={styles.rightAlign}>
              <Text style={styles.greyText}>{item.ago}</Text>
            </View>
          </View>
          {qoute}
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}
