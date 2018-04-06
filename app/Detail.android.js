
import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  Button,
  DatePickerAndroid,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler,
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
//import DatePicker from 'react-native-datepicker';

styles = require('../app/styles.js');
Globals = require('../app/Globals.js');

import BigButton from '../app/utils/BigButton.js';
import BigButtonDisabled from '../app/utils/BigButtonDisabled.js';

const backAction = NavigationActions.back();

// Let's go

export default class DetailPage extends React.Component{

  static navigationOptions = {
    title: 'Teklif ver',
    //headerTitle:<View style={styles.headerLogoHolder}><Image source={require('../img/logo.png')} style={styles.logo}/></View>,
    headerStyle:{ backgroundColor: '#377BCE'},
    headerTitleStyle:{ color: '#ffffff'},
    headerBackTitle: null,
    headerBackTitleStyle:{ color: '#ffffff'},
    gesturesEnabled: true,
    headerTintColor: '#ffffff',
  }

  _k = this.props.navigation.state;

  constructor(props){
    super(props);
    this.state = {
      item: {},
      selectionIsOpen: false,
      dateSelectionIsOpen: false,
      date: new Date(),
      dateName: 'Teslimat tarihi seçiniz',
      price: null,
      priceName: null,
      priceHasFocus: false,
      alternative: {crs_id: null, crs_package: "Alternatif paket seçiniz"},
      suggestions: [{crs_id: null, crs_package: "Alternatif paket seçiniz"}],
      noSuggestion: false,
      canSubmit: false,
      note: null,
      message: null,
      disabled: false,
    }
  }

  _openSelection = ()=> {
    if(this.state.disabled == true)
    {
      this.setState({ selectionIsOpen: true, dateSelectionIsOpen: false, })
    }
  }
  _onSelect = ()=> { this.setState({ selectionIsOpen: false, }); this._checkFormConditions(); }
  _openDateSelection = async ()=> {

    console.log("date opened", new Date( this.state.date ));

    if(this.state.disabled == true)
    {
      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          // Use `new Date()` for current date.
          // May 25 2020. Month 0 is January.
          date: new Date( this.state.date ),
          mode:'spinner'
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          var date = new Date(year, month, day);
          this._onDateChange(date);
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }
    }
  }
  _onDateSelect = ()=> { this.setState({ dateSelectionIsOpen: false, }); this._checkFormConditions(); }
  _onInputFocus = ()=> {
    this.setState({
      dateSelectionIsOpen: false,
      selectionIsOpen: false,
      priceHasFocus: true,
    })
  }

  _onInputBlur = ()=> {
    this.setState({
      priceHasFocus: false,
    })
  }

  _onDateChange = (date) => {

    this.setState({
      date: date,
      dateName: 'Teslimat: ' + Globals.dateToLocalString(date),
    })
  }

  _onInputChange = (event) => {
    this.setState({
      price: event.nativeEvent.text,
      priceName: 'Fiyat: ' + Globals.numberToMoney(event.nativeEvent.text),
    });
    setTimeout(() => { this._checkFormConditions(); }, 100);
  }

  _onNoteInputChange = (event) => {
    this.setState({
      note: event.nativeEvent.text,
    })
  }

  _setPrice = (p) => {
    this.setState({
      price: p.replace(/,/g, ''),
      priceName: 'Fiyat: ' + Globals.numberToMoney(p),
    })
  }

  componentDidMount() {

    const { params } = this.props.navigation.state;

    var data = Globals.response;
    var index = params.sequence;
    var item = data[index];

    var data = new FormData();
        data.append("source", "app");

    Globals.fetchURL(Globals.URLs.suggestions+item.rqs_id, data, this._handleSuggestionsResponse);

    this.setState({
      item: item,
      disabled: item.rqs_status == 0 || item.ofr_id != null ? false : true,
    })

    item.ofr_price != null ? this._setPrice(item.ofr_price) : null;
    item.ofr_delivery_date != null ? this._onDateChange(new Date(item.ofr_delivery_date)) : null;

  }

  _checkFormConditions = () => {

    //console.log(this.state.price, 'form conditions', this.state.date, new Date(), (this.state.date > new Date()), this.state.canSubmit );

    if(this.state.price != null && this.state.price != '' && this.state.date > new Date())
      this.setState({canSubmit: true});
    else
      this.setState({canSubmit: false});
  }

  _onSubmit = () => {

    Keyboard.dismiss;

    var data = new FormData();
        data.append('ofr_price', this.state.price);
        data.append('ofr_delivery_date', Globals.dateToLocalString(this.state.date));
        if(this.state.alternative.crs_id != null) data.append('crs_id', this.state.alternative.crs_id);
        if(this.state.note != null) data.append('ofr_text', this.state.note);

    console.log('submitted');

    Globals.fetchURL(Globals.URLs.submit+this.state.item.rqs_id,
      data,
      this._handleSubmitResponse);
  }

  _handleSubmitResponse = (json, b) => {

    console.log(json, b);

    let messageText;
    if( json == 'error' )
    {
      messageText = 'Teklifinizi gönderirken hata oluştu.';
    }
    else {
      if(json.result == 'OK')
      {
        this.props.navigation.dispatch(backAction);
        this.props.navigation.state.params.refresh();

        messageText = 'Teklifiniz gönderildi.';
      }
      else {
        messageText = 'Hata oluştu ' + b;
      }
    }
    this.setState({
      message: messageText,
    })
  }

  _handleSuggestionsResponse = (json, b) => {

    if( json == 'error' )
    {
      // error
    }
    else {
      if(json.result == 'OK')
      {
        var arr = json.data;
            arr.unshift(this.state.alternative);
        this.setState({
          suggestions: arr,
        });
      }
      else {
        this.setState({noSuggestion: true});
      }
    }
  }

  render(){

    var item = this.state.item;

    var price = this.state.priceHasFocus == true ?
                  this.state.price
                : this.state.priceName;

    var suggestedItems = [];
    for( let car of this.state.suggestions )
    {
      suggestedItems.push(<Picker.Item key={'${index}'} label={car.crs_package} value={car.crs_id} />)
    }

    var select = this.state.noSuggestion == false ?
      <View style={styles.androidSelect}>
        <Picker
          style={styles.androidInput}
          enabled={this.state.disabled}
          selectedValue={this.state.alternative.crs_id}
          onValueChange={(itemValue, itemIndex) => this.setState({alternative: this.state.suggestions[itemIndex]})}>
          {suggestedItems}
        </Picker>
      </View>
    : null;

    var button = this.state.canSubmit == true ?
                  <BigButton onPress={this._onSubmit} title='Teklif Ver' icon='../assets/images/right_arrow.png' />
                : <BigButtonDisabled title='Teklif Ver' icon='../assets/images/right_arrow.png' />;

    return(
      <KeyboardAvoidingView behavior='padding' style={styles.one}>
        <ScrollView style={styles.one}>
          <View style={styles.whiteBox}>
            <View style={styles.one, styles.detailsTop}>
              <View style={styles.detailsNewIcon}>
                <Text style={styles.newIconText}>Yeni</Text>
              </View>
              <View style={styles.rightAlign}>
                <Text style={styles.greyText}>{item.ago}</Text>
              </View>
            </View>
            <Text style={styles.medium} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.small} numberOfLines={2}>Renk tercihi: {item.rqs_color}</Text>
            <Text style={styles.small} numberOfLines={3}>{item.rqs_text}</Text>
            <View style={styles.detailsLocation}>
              <Image source={require('../assets/images/location.png')} style={styles.locationIcon} />
              <Text style={styles.blueText}>{item.cty_title}</Text>
            </View>
            <View style={[styles.one, styles.qouted, styles.detailsBottom]}>
              <Text style={styles.small}>Liste fiyatı: {item.crs_price}</Text>
            </View>
          </View>
          <View style={[styles.detailsFormHolder, styles.defaultBackground]}>
            <View style={styles.one}></View>
            <View style={styles.container}>

              {select}

              <TextInput editable={this.state.disabled} keyboardType='numeric' style={[styles.input, styles.defaultText]} placeholder='Fiyat teklifiniz' value={price} onChange={this._onInputChange} underlineColorAndroid='transparent' onFocus={this._onInputFocus} onBlur={this._onInputBlur}></TextInput>

              <TouchableOpacity activeOpacity={0.8} onPress={this._openDateSelection} style={styles.input}>
                <Text numberOfLines={1} style={[styles.small, styles.dropDownText]}>{this.state.dateName}</Text>
              </TouchableOpacity>

              <TextInput editable={this.state.disabled} autoCorrect={false} multiline={true} numberOfLines={4} clearButtonMode='while-editing' onChange={this._onNoteInputChange} style={[styles.input, styles.spaceBottom, styles.textarea]} placeholder='Müşteriye iletmek istediğiniz not var mı?' underlineColorAndroid='transparent'></TextInput>

              {button}

              <View style={styles.messageWrapper}><Text style={[styles.small, styles.message]}>{this.state.message}</Text></View>

            </View>
            <View style={styles.one}></View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
