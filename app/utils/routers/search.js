'use strict';

var React = require('react-native');

var { Navigator } = React;

var Router = {
  navigator: null,
  route: null,
  goToProfile(profileUid, channelId){
    Router.navigator.push({
      id: 'profile',
      profileUid: profileUid,
      channelId: channelId,
      backBtn:true
    })
  }
};

module.exports = Router;