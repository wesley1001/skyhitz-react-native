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
    },
    checkIfUserExists(uid){
        return new Promise(function(resolve, reject){
            FirebaseRef.userData(uid).once('value',function(userSnap){
                var user = userSnap.val();
                if(user !== null){
                    resolve(true)
                }else{
                    reject(false)
                }
            })
        })
    },
    checkIfArtistUserExists(uid){
        return new Promise(function(resolve, reject){
            FirebaseRef.userChannel(uid).once('value',function(userSnap){
                var user = userSnap.val();
                console.log(user)
                if(user !== null){
                    resolve(true)
                }else{
                    resolve(false)
                }
            })
        })
    }
};

module.exports = Users;