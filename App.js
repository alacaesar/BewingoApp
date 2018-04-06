import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

import SplashPage from './app/Splash.js';
import DetailPage from './app/Detail';
import ListPage from './app/List.js';
import LoginPage from './app/Login.js';

const BackAction = NavigationActions.back({ key: 'List' });

const Bewingo = StackNavigator({
  Splash: {
    screen: SplashPage,
  },
  Login: {
    screen: LoginPage,
  },
  List: {
    path: 'people/:name',
    screen: ListPage,
  },
  Detail:{
    screen: DetailPage,
  },
},
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      backgroundColor: '#F6F7F7',
      elevation: 0,
    }
  }
);

export default Bewingo;
