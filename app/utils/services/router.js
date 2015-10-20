'use strict';

var React = require('react-native');

var { Navigator } = React;

var Router = {
    navigator: null,
    route: null,
    goToStartMenu(){
        Router.navigator.push({
            id:'startmenu',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        });
    },
    goToArtistLogin(){
        Router.navigator.push({
            id:'artist'
        })
    },
    goToCommunityLogin(){
        Router.navigator.push({
            id:'community'
        })
    },
    goToJoin(){
        Router.navigator.push({
            id:'join'
        })
    },
    goToLogin(){
        Router.navigator.push({
            id:'login'
        })
    },
    goToResetPass(email){
        Router.navigator.push({
            id:'resetpass',
            email: email
        })
    },
    goToForgotPass: function(){
        Router.navigator.push({
            id:'forgotpass'
        })
    },
    goToName(){
        Router.navigator.push({
            id:'name'
        })
    },
    goToEmail(){
        Router.navigator.push({
            id:'email'
        })
    },
    goToMainTabBar(selectedTab){
        Router.navigator.replace({
            id:'maintabbar',
            selectedTab: selectedTab ? selectedTab : null
        })
    },
    goBack(){
        Router.navigator.jumpBack();
    },
    goToEditAvatar(type){
        Router.navigator.push({
            id:'editavatar',
            type:type
        });
    },
    goToSquareImageCropper(image, type){
        Router.navigator.push({
            id:'squareimagecropper',
            image: image,
            type:type
        });
    },
    goToEntry(entryUid){
        Router.navigator.push({
            id:'entry',
            entryUid:entryUid,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        })
    },
    goToLikers(entryUid){
        Router.navigator.push({
            id:'likers',
            entryUid: entryUid
        })
    },
    goToComments(entryUid){
        Router.navigator.push({
            id:'comments',
            entryUid: entryUid
        })
    },
    addToPlaylist(entryUid){
        Router.navigator.push({
            id:'addtoplaylist',
            entryUid:entryUid
        })
    },
    addNewList(listAvatar){
        Router.navigator.push({
            id:'createlist',
            avatar: listAvatar ? listAvatar : ''
        });
        Router.navigator.pop();
    },
    goToAddEntriesToList(listName,avatar){
       Router.navigator.push({
            id:'addentriestolist',
            listName:listName,
            avatar: avatar ? avatar:''
        });
    },
    goToList(listUid, listName){
        var that = this;
        that.listUid = listUid;
        that.listName = listName;
        Router.navigator.push({
            id:'list',
            listUid:that.listUid,
            listName:that.listName
        });
    },
    goToProfile(entryUid){
       /* Router.navigator.push({
            id:'profile',
            entryUid:entryUid,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        }) */
    }
};

module.exports = Router;