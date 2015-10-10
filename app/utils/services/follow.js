'use strict';

var FirebaseRef = require('./firebase-ref');
var Promise = require('bluebird');
var youtubeApi = require('./youtubeapi');
var User = require('../../utils/services/user');

var Follow = {
    followUser(user){
        var userPayload = {
            followerUid: User.getUid(),
            followingUid: user.uid,
            follow: true,
            followerUsername: User.userData.username,
            followingUsername: user.username
        };
        FirebaseRef.followUserQueue().push(userPayload,function(error){
            if(error){
            }else{
                console.log('followed userx')
            }
        });
    },
    unfollowUser(user){
        var userPayload = {
            followerUid: User.getUid(),
            followingUid: user.uid,
            follow: false,
            followerUsername: User.userData.username,
            followingUsername: user.username
        };
        FirebaseRef.followUserQueue().push(userPayload,function(error){
            if(error){
            }else{
                console.log('unfollowed user')
            }
        });
    }
};

module.exports = Follow;