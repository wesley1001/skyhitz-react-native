
'use strict';

var React = require('react-native');
var FirebaseRef = require('./firebase-ref');
var Promise = require('bluebird');
// var Heap = require('heap-server')('2794975427');
var LocalStorage = require('./asyncstorage');
var Router = require('./router');
var Loading = require('../../components/loaders/loadingctrl');

var {AlertIOS} = React;

var User = {
    userData:{},
    authenticateWithCustomToken(authToken){

        FirebaseRef.ref.authWithCustomToken(authToken, function(error, authData) {

            console.log(authData);

            if (error) {

                LocalStorage.removeFirebaseToken().then(()=>{
                    Router.goToStartMenu();
                });

            } else {

                User.downloadUserData();

            }

        });

    },
    authenticateWithPassword (user) {

            FirebaseRef.ref.authWithPassword({
                email: user.email,
                password: user.password
            }, function (error, authData) {

                if (error) {
                    Loading.hide();
                    switch (error.code) {
                        case "INVALID_EMAIL":
                            AlertIOS.alert(
                                null,
                                'Please enter a valid email address.'
                            );
                            break;
                        case "INVALID_USER":
                            AlertIOS.alert(
                                null,
                                "Hm... we couldn't find your account. Look for typos?"
                            );
                            break;
                        case "INVALID_PASSWORD":
                            AlertIOS.alert(
                                null,
                                "Your username and password did not match."
                            );
                            break;
                        default:
                            AlertIOS.alert(
                                null,
                                error.message
                            );
                    }
                } else {

                    LocalStorage.storeFirebaseToken(authData.token);
                    User.downloadUserData();

                }
            });

    },
    authenticateWithOAuth(authObj){

            FirebaseRef.ref.authWithOAuthToken(authObj.provider, authObj.token, function(error, authData) {

                if (error) {

                } else {

                    LocalStorage.storeFirebaseToken(authData.token);

                    if(authObj.provider === "google"){

                        LocalStorage.storeGoogleOauthToken(authObj.token);

                    }

                    User.downloadUserData();

                }

            });

    },
    downloadUserData(){

        FirebaseRef.userData(User.getUid()).once('value',function(snapshot){

            User.userData = snapshot.val();

            User.validateAccount();

        }, function(err){

        });

    },
    updateUserData(){

        FirebaseRef.userData(User.getUid()).once('value',function(snapshot){

            User.userData = snapshot.val();

        }, function(err){

        });

    },
    createAccount(){
        FirebaseRef.userCreate().push(User.getAuthData(),function(error){
            if(error){

            }else{
                User.watchIfAccountWasCreated();
            }
        });
    },
    watchIfAccountWasCreated(){
        var hasReceivedResponseFromAppQueue = false;
        var callback = function (snapshot) {
            if (snapshot.val() == null) {
                return;
            }
            if (hasReceivedResponseFromAppQueue){
                return;
            }
            hasReceivedResponseFromAppQueue = true;
            FirebaseRef.userData(User.getUid()).off('value', callback);
            User.userData = snapshot.val();
            User.validateAccount();
        };
        var errorCallback = function(error){
            if(error){
            }
        };
        FirebaseRef.userData(User.getUid()).on('value', callback, errorCallback);
    },
    validateAccount(){

        if(User.userData === null){
            User.createAccount();
            return;
        }

        if(User.userData.email === ''){
            Router.goToEmail();
            Loading.hide();
            return;
        }

        if(User.userData.username === ''){
            Router.goToName();
            Loading.hide();
            return;
        }

        if(User.userData.name === null){
            Router.goToName();
            Loading.hide();
            return;
        }

        User.markUserAsAuth();

    },
    markUserAsAuth (){

        /*
         Heap.identify({name: User.userData.name,
         uid: User.userData.uid,
         email: User.userData.email});

         */

        Router.goToMainTabBar();
        Loading.hide();
    },
    createUser(user){
        return new Promise(function(resolve, reject) {
            FirebaseRef.ref.createUser({
                email: user.email,
                password: user.password
            }, function (error, userData) {
                if (error) {
                    console.log(error.message);
                    switch (error.code) {
                        case "EMAIL_TAKEN":
                            reject('The email address you entered already has an account.');
                            break;
                        case "INVALID_EMAIL":
                            reject('Please enter a valid email address!');
                            break;
                        default:
                            reject(error.message);
                    }
                } else {

                    User.authenticateWithPassword(user);

                }
            });
        });
    },
    updateEmail(email){
        FirebaseRef.userData(User.getUid()).child('email').set(email,function(error){
            if(error){
                Loading.hide();
                AlertIOS.alert(
                    null,
                    error.message
                )
            }else {
              User.downloadUserData();
            }
        });
    },
    resetPassword(user){

        return new Promise(function(resolve, reject) {
            FirebaseRef.ref.resetPassword({
                email: user.email
            }, function (error) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_USER":
                            reject("Hm... we couldn't find your account. Look for typos?");
                            break;
                        default:
                            reject("We couldn't reset your password.");
                    }
                } else {
                    resolve("Password reset email sent successfully!");
                }
            });
        });
    },
    changePassword(user){

        return new Promise(function(resolve, reject) {
            FirebaseRef.ref.changePassword({
                email: user.email,
                oldPassword: user.oldPassword,
                newPassword: user.newPassword
            }, function (error) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_PASSWORD":
                            reject("Your temporary password is incorrect.");
                            break;
                        case "INVALID_USER":
                            reject("Hm... we couldn't find your account. Look for typos?");
                            break;
                        default:
                            reject("We couldn't change your password, please try again.");
                    }
                } else {

                    user.password = user.newPassword;

                    User.authenticateWithPassword(user);

                    resolve();

                }
            });
        });

    },
    changeEmail(user){

        FirebaseRef.ref.changeEmail({
            oldEmail: user.oldEmail,
            newEmail: user.newEmail,
            password: user.password
        }, function(error) {
            if (error) {
                switch (error.code) {
                    case "INVALID_PASSWORD":
                        console.log("The specified user account password is incorrect.");
                        break;
                    case "INVALID_USER":
                        console.log("The specified user account does not exist.");
                        break;
                    default:
                        console.log("Error creating user:", error);
                }
            } else {
                console.log("User email changed successfully!");
            }
        });

    },
    removeUser(user){

        FirebaseRef.ref.removeUser({
            email: user.email,
            password: user.password
        }, function(error) {
            if (error) {
                switch (error.code) {
                    case "INVALID_USER":
                        console.log("The specified user account does not exist.");
                        break;
                    case "INVALID_PASSWORD":
                        console.log("The specified user account password is incorrect.");
                        break;
                    default:
                        console.log("Error removing user:", error);
                }
            } else {
                console.log("User account deleted successfully!");
            }
        });
    },
    getSmallAvatar(uid){
        return new Promise(function(resolve, reject){
            FirebaseRef.smallAvatarUrl(uid)
                .once('value',function(snap){
                     resolve(snap.val());
                }, function(error){
                    if(error){
                        reject(error);
                    }
                });
        });
    },
    getLargeAvatar(uid){
        return new Promise(function(resolve, reject){
            FirebaseRef.largeAvatarUrl(uid)
                .once('value',function(snap){
                    resolve(snap.val());
                }, function(error){
                    if(error){
                        reject(error);
                    }
                });
        });
    },
    getUid () {
        if (!FirebaseRef.ref.getAuth()) {
            return null;
        }
        return FirebaseRef.ref.getAuth().uid;
    },
    getUsername() {
        console.log(this.downloadUserData());
        return this.downloadUserData();
    },
    getAuthData () {
        if (!FirebaseRef.ref.getAuth()) {
            return null;
        }
        return FirebaseRef.ref.getAuth();
    },
    getAuthToken (){
        if (!FirebaseRef.ref.getAuth()) {
            return null;
        }
        return FirebaseRef.ref.getAuth().token;
    },
    generateAvatar () {

        var stringStart = 'DefaultAvatar',

            stringEnd = '.png',

            stringMid = getRandomInt(1, 7);

        return stringStart + stringMid + stringEnd;

    },
    logOut () {

        User.markUserAsLoggedOut();
        FirebaseRef.ref.unauth();

    },
    markUserAsLoggedOut (){
        console.log('markUserAsLoggedOut');

    }

};

module.exports = User;