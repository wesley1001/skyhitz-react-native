'use strict';

var React = require('react-native');
var FirebaseRef = require('./firebase-ref');
var Promise = require('bluebird');
var youtubeApi = require('../../utils/services/youtubeapi');
var Loading = require('../../components/loaders/loadingctrl');
var User = require('../../utils/services/user');
var Route = require('../../utils/services/router');


var {AlertIOS} = React;

var Username = {
    username:"",
    usernameTaken(){
        Loading.hide();
        AlertIOS.alert(
            null,
            "A user with that username already exists."
        )

    },
    checkIfYoutubeUsernameIsTaken(){

       return new Promise (function(resolve, reject){

        youtubeApi.checkIfUsernameExists(Username.username).then((data)=>{

            console.log(data);

            if(data.items.length === 1){

                // check if account matches google account so artists can use the same username

                if(Username.checkIfMatchesGoogleUid(data.items[0]) === true){

                    Username.updateUsername(resolve, reject);

                }else{
                    Username.usernameTaken();
                    reject();
                }

            }else{

                Username.checkIfSkyhitzUsernameIsTaken(resolve, reject);

            }

        });

       });

    },
    checkIfMatchesGoogleUid(data){

        var googleUid = User.getUid().substring(7);

        if(data.hasOwnProperty('contentDetails')){

            if(data.contentDetails.hasOwnProperty('googlePlusUserId')){

                if(data.contentDetails.googlePlusUserId === googleUid){

                    return true;

                }
            }
        }

        return false;

    },
    checkIfSkyhitzUsernameIsTaken(resolve, reject){

        FirebaseRef.usernameExists().orderByChild("username").equalTo(Username.username).once("value", function(snapshot) {

            if(snapshot.val() !== null){

                reject();
                Username.usernameTaken();

            } else {

                // update Username

               Username.updateUsername(resolve, reject);

            }

        });

    },
    updateUsername(resolve, reject){

        FirebaseRef.userUsername(User.getUid()).set(Username.username, function (error) {
            if (error) {
                Loading.hide();
                AlertIOS.alert(
                    null,
                    error.message
                )
                reject();
            } else {

               console.log('username updated');

                Loading.hide();

                if(Route.route.id === 'maintabbar'){

                     User.updateUserData();
                     resolve();

                }else{

                    User.downloadUserData();
                    resolve();
                }

            }
        });

    }
};

module.exports = Username;