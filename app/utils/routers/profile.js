'use strict';

var React = require('react-native');

var { Navigator } = React;

var Router = {
  navigator: null,
  route: null,
  goToMainTabBar(selectedTab){
    Router.navigator.replace({
      id: 'maintabbar',
      selectedTab: selectedTab ? selectedTab : null
    })
  },
  goBack(){
    Router.navigator.jumpBack();
  },
  goToList(listUid, listName){
    Router.navigator.push({
      id: 'list',
      listUid: listUid,
      listName: listName
    });
  },
  goToProfile(user){
    Router.navigator.push({
      id: 'profile',
      user: user,
      backBtn: true
    })
  }
};

module.exports = Router;