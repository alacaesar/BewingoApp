/* STYLES */
'use strict';
var React = require('react-native');

module.exports = {

  response: null,
  user: null,
  exponentPushToken: null,
  fetchURL: function(query, data, callback){

    fetch(query, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
      .then( response => response.json() )
      .then( json => { callback(json); } )
      .catch( error => callback('error', error) );
  },
  numberToMoney: function(number){
    //var price = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(parseFloat(number.replace(/,/g, '')));
    var price = '₺' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //var price = number;
    //return price.replace(',00', '');
    return price;
  },
  URLs:{
    login: 'https://www.bewingo.com/dealer/general_ajx/login',
    list: 'https://www.bewingo.com/dealer/general_ajx/lister/1',
    logout: 'https://www.bewingo.com/dealer/general_ajx/logout',
    suggestions: 'https://www.bewingo.com/dealer/general_ajx/request_suggestions/',
    submit: 'https://www.bewingo.com/dealer/general_ajx/send_offer/',
  },
  accont:{
    login: function(user, pass, callback){
      Globals.fetchURL(Globals.URLs.login+'?user='+user+'&pass='+pass,
        {
          // data
        }, this.handleResponse(json, b, callback));
    },
    handleResponse: function(json, b, callback){

      var answer;
      if( json == 'error' )
      {
        answer = {result:'error', message:'Hata oluştu: ' + b};
      }
      else {
        if(json.result == 'OK')
        {
          Globals.user = json.user;
          answer = {result:'ok', message:''};
        }
        else{
          answer = {result:'error', message:'E-mail adresi veya şifreniz yanlış.'};
        }
      }
      callback(answer);
    }
  },
  dateToLocalString: function(date){
    return [this.pad(date.getDate()), this.pad(date.getMonth()+1), date.getFullYear()].join('.')
  },
  pad: function(n) {return n < 10 ? "0"+n : n;}
  /*
  login: function(user, pass, callback){

    Globals.fetchURL(Globals.URLs.login+'?user='+user+'&pass='+pass,
      {
        // data
      }, (json, b) => {

        console.log('zazaza', json, b);

        var answer;
        if( json == 'error' )
        {
          answer = {result:'error', message:'Hata oluştu: ' + b};
        }
        else {
          if(json.result == 'OK')
          {
            Globals.user = json.user;
            answer = {result:'ok', message:''};
          }
          else{
            answer = {result:'error', message:'E-mail adresi veya şifreniz yanlış.'};
          }
        }
        callback(answer);
      });
  },*/

};

function encodeBody(obj){
  var body = [];
  for( var property in obj){
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(obj[property]);
    body.push(encodedKey+"="+encodedValue);
  }
  return body.join('&');
}
