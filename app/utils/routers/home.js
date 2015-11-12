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