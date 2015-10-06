'use strict';

var React = require('react-native');
var FirebaseRef = require('../../utils/services/firebase-ref');
var User = require('../../utils/services/user');
var Loading = require('../../components/loaders/loadingctrl');
var Promise = require('bluebird');
var {
    AlertIOS
    } = React;

var Stripe = {

    createCustomer(cardToken){

        var custObj = {
            uid: User.getUid(),
            token: cardToken
        };

        FirebaseRef.createStripeCustomerQueue().push(custObj)

        Stripe.watchIfCardWasCreated();

        // listen for change and update user data

    },
    addCard(cardToken){

        var custObj = {
            uid: User.getUid(),
            token: cardToken,
            stripeUid: User.userData.stripeUid
        };

        FirebaseRef.addStripeCardQueue().push(custObj);

        Stripe.watchIfCardWasCreated();

        // listen for change and update user data

    },
    watchIfCardWasCreated(){

        var hasReceivedResponseFromAppQueue = false;
        var callback = function (snapshot) {
            if (snapshot.val() == null) {
                return;
            }

            if (hasReceivedResponseFromAppQueue){
                return;
            }

            hasReceivedResponseFromAppQueue = true;

            FirebaseRef.userStripeCardData(User.getUid()).off('value', callback);

            User.updateUserData();

        };

        var errorCallback = function(error){

            if(error){

            }

        };

        FirebaseRef.userStripeCardData(User.getUid()).on('value', callback, errorCallback);

    },
    createStandaloneAccount(userInfo){

        FirebaseRef.createStandaloneAccountQueue().push(userInfo);

        Stripe.watchIfAccountWasCreated();

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

            FirebaseRef.userStripeAccount(User.getUid()).off('value', callback);

            User.updateUserData();

            Loading.hide();

            AlertIOS.alert(
                null,
                'Check your email and verify your Stripe account before you withdraw points from your Skyhitz account.'
            )
        };

        var errorCallback = function(error){
            if(error){
                AlertIOS.alert(
                    null,
                    "We couldn't send you an email to create a Stripe account, please check that your email is valid."
                )
            }
        };

        FirebaseRef.userStripeAccount(User.getUid()).on('value', callback, errorCallback);
    },
    chargeCustomer(amount){

        Loading.show();

        var chargeObj = {
            amount:amount,
            customerId:User.userData.stripeUid,
            uid: User.getUid(),
            receipt_email:User.userData.email
        };

        FirebaseRef.chargeCustomerQueue().push(chargeObj);
        return  new Promise(function(resolve,reject){Stripe.watchPointsUpdate(resolve, reject)});
    },
    watchPointsUpdate(resolve, reject){

        var hasReceivedResponseFromAppQueue = false;

        var callback = function (snapshot) {
            if (snapshot.val() == User.userData.points) {
                return;
            }

            if (hasReceivedResponseFromAppQueue){
                return;
            }

            hasReceivedResponseFromAppQueue = true;

            FirebaseRef.userPoints(User.getUid()).off('value', callback);

            User.updateUserData();

            Loading.hide();

            resolve(snapshot.val());

        };

        var errorCallback = function(error){
            if(error){
                reject();
                AlertIOS.alert(
                    null,
                    "Something went wrong please contact us at support@skyhitzmusic.com"
                )
            }
        };

        FirebaseRef.userPoints(User.getUid()).on('value', callback, errorCallback);

    },
    cashOut(amount){

        Loading.show();

        var transferObj = {
            amount:amount,
            destination:User.userData.stripeAccountUid,
            uid: User.getUid()
        };

        FirebaseRef.cashOutQueue().push(transferObj);
        return  new Promise(function(resolve,reject){Stripe.watchPointsUpdate(resolve, reject)});
    }
};

module.exports = Stripe;