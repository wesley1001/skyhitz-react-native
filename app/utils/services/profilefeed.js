// Remember to change the url that points to the production firebase

var Firebase = require('firebase');
var FirebaseRef = require('../../utils/services/firebase-ref');
var User = require('./user');
var Promise = require('bluebird');

'use strict';

var profileFeedApi = {
    count : 0,
    pageSize : 15,
    notifications : [],
    notificationsLastLength:0,
    notificationsLength:0,
    hasReachedEnd : false,
    getHomeNotificationsFinal(resolve){
        if(profileFeedApi.count === profileFeedApi.notificationsLastLength){
            resolve(profileFeedApi.notifications);
        } else{
            if(profileFeedApi.hasReachedEnd === false){
                profileFeedApi.hasReachedEnd = true;
                resolve(profileFeedApi.notifications);
            } else{
                resolve(false);
            }
        }
    },
    addNotificationObj(notificationObj, resolve, reject, key){
        profileFeedApi.notifications[key] = notificationObj;
        profileFeedApi.notificationsLastLength = Object.keys(profileFeedApi.notifications).length;
        if(profileFeedApi.notificationsLength === profileFeedApi.notificationsLastLength){
            profileFeedApi.getHomeNotificationsFinal(resolve);
        }
    },
    addNotificationAvatar(data, resolve, reject, key){
        if(data.hasOwnProperty('uid')) {
            User.getSmallAvatar(data.uid).then(function (value) {
                data.avatarUrl = value;
                profileFeedApi.addNotificationObj(data, resolve, reject, key);
            }).catch(function (error) {
                if(error){
                    reject(error);
                }
            });
        }
    },
    getNotificationObj(key, resolve, reject){
        FirebaseRef.notification(key)
            .once('value',function(snap){
                profileFeedApi.addNotificationAvatar(snap.val(), resolve, reject, key);
            }, function(error){
                if(error){
                    reject(error);
                }
            });
    },
    getKeys(notificationsObj, resolve, reject){
        for(var key in notificationsObj){
            profileFeedApi.getNotificationObj(key, resolve, reject);
        }
    },
    getProfileNotifications(uid){
        return new Promise(function(resolve, reject) {
            profileFeedApi.count += profileFeedApi.pageSize;
            FirebaseRef.profileNotifications(uid).
                startAt().limitToFirst(profileFeedApi.count).once('value', function (snap) {
                    var notificationsObj = snap.val();
                    console.log(snap.val());
                    if(notificationsObj !== null){
                        profileFeedApi.notificationsLength = Object.keys(notificationsObj).length;
                        profileFeedApi.getKeys(notificationsObj, resolve, reject);
                    }else{
                        resolve(profileFeedApi.notifications);
                    }
                },function(error){
                    if(error){
                        reject(error);
                    }
                });
        });
    }
};

module.exports = profileFeedApi;

