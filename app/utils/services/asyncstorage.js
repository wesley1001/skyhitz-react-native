'use strict';

var React = require('react-native');
var { AsyncStorage } = React;

var LocalStorage = {
    async storeFirebaseToken(token) {
        try {
            await AsyncStorage.setItem('firebaseToken', token);
            console.log('object stored');
        } catch (error) {
            console.log('object not stored');
        }
    },
    async removeFirebaseToken() {
        try {
            await AsyncStorage.removeItem('firebaseToken');
            console.log('object stored');
        } catch (error) {
            console.log('object not stored');
        }
    },
    async loadFirebaseToken() {
        try {
            var value = await AsyncStorage.getItem('firebaseToken');
            if (value !== null){
                return value;
            } else {
                return null;
            }
        } catch (error) {
           console.log('AsyncStorage error: ' + error.message);
        }
    },
    async storeGoogleOauthToken(token) {
        try {
            await AsyncStorage.setItem('googleOauthToken', token);
            console.log('object stored');
        } catch (error) {
            console.log('object not stored');
        }
    },
    async removeGoogleOauthToken() {
        try {
            await AsyncStorage.removeItem('googleOauthToken');
            console.log('object stored');
        } catch (error) {
            console.log('object not stored');
        }
    },
    async loadGoogleOauthToken() {
        try {
            var value = await AsyncStorage.getItem('googleOauthToken');
            if (value !== null){
                return value;
            } else {
                return null;
            }
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }
};


module.exports = LocalStorage;