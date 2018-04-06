/* STYLES */
'use strict';
var React = require('react-native');
var { StyleSheet, } = React;

module.exports = StyleSheet.create({

  // ALL STYLES GO HERE

  logo:{width:100, height:26},
  headerLogoHolder:{
    marginRight:20,
    marginLeft:20,
  },
  settingsIcon:{
    width:24,
    height:24,
  },

  ground:{
    flex:1,
    flexDirection: 'row',
    backgroundColor: "#F6F7F7",
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex:20,
    maxWidth:640,
  },
  one:{
    flex:1,
  },
  defaultBackground:{ backgroundColor: '#F6F7F7', },
  center:{
    justifyContent: 'center',
    //alignItems: 'center'
  },
  listHeader:{
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  request: {
    flex:1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    //marginBottom: 10,
    marginBottom: 15,
    minHeight: 130,
    maxHeight: 130,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset:{width:1, height:1},
    shadowOpacity:.2,
    shadowRadius:2,
    elevation:2,
  },
  requestLarge: {
    minHeight: 170,
  },
      requestLeft:{flex:1, maxWidth:45},
        checkIcon:{top:22, width:20, height:20, left:15, },
        newIcon:{top:22, width:35, height:20, backgroundColor:"#166FDB", borderTopRightRadius:10, borderBottomRightRadius:10, justifyContent: 'center', alignItems: 'center'},
          newIconText:{fontSize:11, color:'#ffffff', backgroundColor:'transparent'},
      requestRight:{flex:1, paddingTop:20, paddingRight:20, paddingBottom:10, },
        requestLocation:{flex:1, flexDirection: 'row', alignItems:'center', maxHeight:30,},
          locationIcon:{width:13, height:16, marginRight:5, },

        qouted:{
          maxHeight:40,
          height:40,
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          alignItems:'center',
          flexDirection: 'row',
        },

  //TEXT STYLES
  defaultText:{fontSize:16, color:'#000000'},
  tiny:{fontSize:14, color:'#777777'},
  small:{fontSize:16, color:'#777777'},
  medium:{fontSize:20, color:'#000000'},
  blueText:{fontSize:13, color:'#4388D1'},
  greyText:{fontSize:13, color:'#777777'},
  centerText:{ textAlign:'center'},
  blueBackground:{backgroundColor:"#166FDB"},
  headingText:{fontSize:26, color:'#ffffff'},
  bold:{fontWeight:'bold'},

  messageWrapper:{
    height:50,
    justifyContent:'center', alignItems:'center'
  },
  message:{
    textAlign:'center',
    //color:'#BF4545',
  },
  spinner:{
    height:50,
    justifyContent:'center', alignItems:'center'
  },

  rightAlign:{
    flex:1,
    alignItems:'flex-end',
  },

  spaceBottom:{
    marginBottom: 20,
  },
  input:{
    backgroundColor:'#ffffff',
    shadowColor: '#000000',
    shadowOffset:{width:1, height:1},
    shadowOpacity:.2,
    shadowRadius:2,
    elevation:2,
    marginTop:.3 ,
    flex:1,
    flexDirection: 'row',
    maxHeight:60,
    height:60,
    paddingRight:20,
    paddingLeft:20,
    alignItems:'center',
  },
  androidSelect:{
    backgroundColor:'#ffffff',
    elevation:2,
    marginTop:.3 ,
    maxHeight:60,
    height:60,
    paddingRight:13,
    paddingLeft:13,
  },
  androidInput:{
    backgroundColor:'#ffffff',
    height:60,
  },
  textarea:{
    lineHeight:35,
    maxHeight:150,
    height: 150,
    fontSize: 16,
    paddingTop:20,
    paddingBottom:20,
    textAlignVertical: 'top',
  },

  bigButton:{
    backgroundColor:'#4388D1',
    flex:1,
    flexDirection: 'row',
    maxHeight:60,
    height: 60,
    borderRadius:5,
    alignItems: 'center',
    paddingRight:20,
    paddingLeft:20,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    shadowColor: '#377BCE',
    shadowOffset:{width:1, height:1},
    shadowOpacity:.5,
    shadowRadius:2,
  },
    bigButtonText:{
      color:'#ffffff',
      fontSize:18,
      //lineHeight: 60,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bigButtonIcon:{
      maxWidth:8,
      height:12,
      flex:1,
    },
    disabledBackground:{
      backgroundColor: '#BBBBBB',
      shadowOpacity: 0,
    },

    whiteBox:{
      backgroundColor:'#ffffff',
      shadowColor: '#000000',
      shadowOffset:{width:1, height:1},
      shadowOpacity:.2,
      shadowRadius:2,
      elevation:2,
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 30,
      paddingBottom: 20,
    },
    detailsTop:{
      alignItems:'center',
      flexDirection: 'row',
      marginBottom:5,
    },
    detailsNewIcon:{ width:40, height:20, backgroundColor:"#166FDB", borderRadius:10, justifyContent: 'center', alignItems: 'center'},
    detailsLocation:{
      flex:1,
      flexDirection: 'row',
      minHeight:30,
      alignItems: 'center',
      marginTop:5,
    },
    detailsFormHolder:{
      flex:1,
      flexDirection: 'row',
      paddingTop: 30,
      paddingBottom: 30,
    },
    dropDownText:{
      //lineHeight:60,
      color: '#000000'

    },
    detailsBottom:{
      marginTop: 10,
      paddingTop: 15,
    },

    footerTabsHolder:{
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderTopWidth:1,
      borderTopColor:'#dddddd',
      height:50,
    },
      footerTab:{
        height:50,
        alignItems:'center',
        justifyContent:'center',
      },
       footerTabText:{
         textAlign:'center',
         justifyContent:'center',
         fontSize: 13,
         color: '#cccccc'
       },
       footerTabTextSelected:{
         color: '#4388D1',
         fontWeight: 'bold',
       },

    splash:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#377BCE',
    },
      splashLogo:{
        width:180,
        height:47,
        marginBottom:50,
      },
      splashIcon:{
        width:104,
        height:120,
        marginBottom:30,
      },

    headerAccountButton:{ paddingRight: 15, },
    headerAccountButtonText:{
      color: '#ffffff',
      fontSize: 18,
    },
    closeButton:{
      width:40,
      height:40,
    },
    modalHeader:{
      height:40,
      marginTop:40,
      justifyContent:'flex-end',
      alignItems:'flex-end',
      flexDirection:'row',
    },
});
