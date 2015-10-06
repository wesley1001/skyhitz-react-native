// Remember to change the url that points to the production firebase

var Firebase = require('firebase');
var FB_PROD_URL = 'https://skyhitz-prod.firebaseio.com/sandbox/alejo/v1';
var FB_STAGING_URL = 'https://skyhitz-staging.firebaseio.com/sandbox/alejo/v1';
var User = require('./user');
var Promise = require('bluebird');

'use strict';

var homeFeedApi = {
    count : 0,
    pageSize : 15,
    notifications : [],
    notificationsLastLength:0,
    notificationsLength:0,
    hasReachedEnd : false,
    getHomeNotificationsFinal(resolve){
        if(homeFeedApi.count === homeFeedApi.notificationsLastLength){
            resolve(homeFeedApi.notifications);
        } else{
            if(homeFeedApi.hasReachedEnd === false){
            homeFeedApi.hasReachedEnd = true;
            resolve(homeFeedApi.notifications);
            } else{
                resolve(false);
            }
        }
    },
    addNotificationObj(notificationObj, resolve, reject, key){

        homeFeedApi.notifications[key] = notificationObj;
        homeFeedApi.notificationsLastLength = Object.keys(homeFeedApi.notifications).length;

        if(homeFeedApi.notificationsLength === homeFeedApi.notificationsLastLength){
            homeFeedApi.getHomeNotificationsFinal(resolve);
        }
    },
    addNotificationAvatar(data, resolve, reject, key){
        if(data.hasOwnProperty('uid')) {
            User.getProfilePicUrl(data.uid).then(function (value) {
                data.avatarUrl = value;
                homeFeedApi.addNotificationObj(data, resolve, reject, key);
            }).catch(function (error) {
                if(error){
                    reject(error);
                }
            });
        }
    },
    getNotificationObj(key, resolve, reject){
        new Firebase(FB_STAGING_URL+'/notificationInfo/index/data/'+key)
            .once('value',function(snap){
                homeFeedApi.addNotificationAvatar(snap.val(), resolve, reject, key);
            }, function(error){
                if(error){
                    reject(error);
                }
            });
    },
    getKeys(notificationsObj, resolve, reject){
        for(var key in notificationsObj){
            homeFeedApi.getNotificationObj(key, resolve, reject);
        }
    },
    getHomeNotifications(userId){
        return new Promise(function(resolve, reject) {
            homeFeedApi.count += homeFeedApi.pageSize;
            new Firebase(FB_STAGING_URL + '/notificationInfo/index/userHome/' + userId).
                startAt().limitToFirst(homeFeedApi.count).once('value', function (snap) {
                    var notificationsObj = snap.val();
                    console.log(snap.val());
                    if(notificationsObj !== null){
                        homeFeedApi.notificationsLength = Object.keys(notificationsObj).length;
                        homeFeedApi.getKeys(notificationsObj, resolve, reject);
                    }else{
                        resolve(homeFeedApi.notifications);
                    }
                },function(error){
                if(error){
                    reject(error);
                }
            });
        });
    }
};

module.exports = homeFeedApi;

