
'use strict';

var Firebase = require('firebase'),
    Env = require('../../config/env'),
    ref = new Firebase(Env.FB_URL),
    userInfoDataRef = ref.child('userInfo/data'),
        FirebaseRef = {
            ref: ref,

            // User

            userData (uid) {
                return userInfoDataRef.child(uid);
            },
            userName (uid){
                return userInfoDataRef.child(uid + "/name");
            },
            userUsername (uid){
                return userInfoDataRef.child(uid + "/username");
            },
            userEmail (uid) {
                return userInfoDataRef.child(uid + '/email');
            },
            userPoints (uid) {
                return userInfoDataRef.child(uid + '/points');
            },
            userCreate(){
                return ref.child('appQueue/user/create/tasks');
            },
            usernameExists(){
                return userInfoDataRef;
            },
            userFollowers (uid) {
                return ref.child('followInfo/index/followsUser/' + uid);
            },
            userFollowing(uid){
                return ref.child('followInfo/index/userFollows/' + uid);
            },

            // Follow

            followUserQueue(){
                return ref.child('appQueue/user/follow/tasks');
            },

            // Entry

            entry(entryUid){
                return ref.child('entryInfo/index/'+entryUid);
            },
            entryData(entryUid){
                return ref.child('entryInfo/data/'+entryUid);
            },
            entryLikers(entryUid){
                return ref.child('likeInfo/index/entryToUser/'+ entryUid);
            },
            entryComments(entryUid){
                return ref.child('commentInfo/index/entryToComments/'+ entryUid);
            },
            sendCommentQueue(){
                return ref.child('appQueue/comment/create/tasks/');
            },
            addEntryQueue(){
                return ref.child('appQueue/entry/create/tasks');
            },
            likeEntryQueue() {
                return ref.child('appQueue/entry/like/tasks');
            },
            entryPointsQueue() {
                return ref.child('appQueue/entry/points/tasks');
            },

            // Lists

            topList(){
                return ref.child('entryInfo/data');
            },
            hotLists(){
                return ref.child('listInfo/data');
            },
            createListQueue(){
                return ref.child('appQueue/list/create/tasks');
            },
            followListQueue(){
                return ref.child('appQueue/list/follow/tasks');
            },
            addEntryToListQueue(){
                return ref.child('appQueue/list/addEntry/tasks');
            },
            addedEntryToPlaylistQueue(listUid, entryUid){
                //return ref.child('listInfo/data/'+listUid+'/entries/' + entryUid);
                return ref.child('listInfo/data/'+listUid+'/entries/');
            },
            addedPlaylistQueue(uid, listUid){
                return ref.child('listInfo/index/userToList/'+uid+'/'+listUid);
            },
            list(uid){
                return ref.child('listInfo/data/'+uid);
            },
            userPlaylists(uid){
                return ref.child('listInfo/index/userToList/'+uid);
            },
            followedLists(uid){
                return ref.child('followInfo/index/userToLists/'+uid);
            },

            // Notifications

            homeNotifications(uid){
              return ref.child('/notificationInfo/index/userHome/' + uid);
            },
            profileNotifications(uid){
              return ref.child('/notificationInfo/index/userActivity/' + uid)
            },
            notification(uid){
              return ref.child('/notificationInfo/index/data/' + uid);
            },

            // Home Banner

            homeBanner(){
              return ref.child('stats/weekBanner');
            },

            // Stripe

            userStripeCardData (uid) {
                return userInfoDataRef.child(uid + '/stripeCard');
            },
            userStripeAccount (uid) {
                return userInfoDataRef.child(uid + '/stripeAccountUid');
            },
            createStripeCustomerQueue(){
                return ref.child('appQueue/stripe/customer/create/tasks');
            },
            addStripeCardQueue(){
                return ref.child('appQueue/stripe/customer/cards/add/tasks');
            },
            createStandaloneAccountQueue(){
                return ref.child('appQueue/stripe/account/create/tasks');
            },
            chargeCustomerQueue(){
                return ref.child('appQueue/stripe/customer/charge/tasks');
            },
            cashOutQueue(){
                return ref.child('appQueue/stripe/customer/transfer/tasks');
            },

            // Images

            smallAvatarUrl(uid){
                return userInfoDataRef.child(uid + "/smallAvatarUrl");
            },
            largeAvatarUrl(uid){
                return userInfoDataRef.child(uid + "/largeAvatarUrl");
            }

        };

module.exports = FirebaseRef;