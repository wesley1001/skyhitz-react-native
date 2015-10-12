'use strict';

var React = require('react-native');
var FirebaseRef = require('./firebase-ref');
var Promise = require('bluebird');


var Users = {
    users: [],
    getUserData(uid){
        FirebaseRef.userData(uid).once('value',function(){

        })
    }
};

module.exports = Users;