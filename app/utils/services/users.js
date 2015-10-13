'use strict';

var React = require('react-native');
var FirebaseRef = require('./firebase-ref');
var Promise = require('bluebird');


var Users = {
    users: [],
    getUserData(uid){
        return new Promise(function(resolve, reject){
            FirebaseRef.userData(uid).once('value',function(userSnap){
                var user = userSnap.val();
                if(user !== null){
                    resolve(user)
                }else{
                    reject()
                }
            })
        })
    }
};

module.exports = Users;