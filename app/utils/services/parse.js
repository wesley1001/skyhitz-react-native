'use strict';

var React = require('react-native');
var Parse = require('parse/react-native').Parse;
var Promise = require('bluebird');
var secrets = require('../secrets/secrets');
var Loading = require('../../components/loaders/loadingctrl');
var FirebaseRef = require('../../utils/services/firebase-ref');
var User = require('../../utils/services/user');
var Router = require('../../utils/services/router');

Parse.initialize(secrets.parse.app_id, secrets.parse.javascript_key);

var name = 'sh.jpg';

var Parse_Service = {

    saveLargeThumbnailToParse(file, type){

        return new Promise(function(resolve, reject){

       var parseFile = new Parse.File(name, {base64:file});

        parseFile.save().then(function(success) {
            // The file has been saved to Parse.

            if(type === 'profile'){

            var oldFileName = User.userData.largeAvatarUrl;

            var oldFileNameArr = oldFileName.split('/');

            var length = oldFileNameArr.length;

            FirebaseRef.largeAvatarUrl(User.getUid()).set(success._url, function(err){

                if(!err){

                    Parse_Service.deleteFile(oldFileNameArr[length - 1]);

                }

            });

            User.userData.largeAvatarUrl = success._url;

            }

            resolve(success._url);


        }, function(error) {
            // The file either could not be read, or could not be saved to Parse.
            console.log(error);

            Loading.hide();

            reject();

        });

        });

    },
    saveSmallThumbnailToParse(file, type, largeImageUrl){

        var parseFile = new Parse.File(name, {base64:file});

        parseFile.save().then(function(success) {
            // The file has been saved to Parse.

            if(type === 'profile'){

            var oldFileName = User.userData.smallAvatarUrl;

            var oldFileNameArr = oldFileName.split('/');

            var length = oldFileNameArr.length;

            FirebaseRef.smallAvatarUrl(User.getUid()).set(success._url, function(err){

                if(!err){

                    Parse_Service.deleteFile(oldFileNameArr[length - 1]);

                }

            });

            User.userData.smallAvatarUrl = success._url;

            Loading.hide();

            Router.goToMainTabBar('settings');

            }else{

            var ListAvatar = {
                small: success._url,
                large:largeImageUrl
            };
            Loading.hide();
            Router.addNewList(ListAvatar);

            }

        }, function(error) {
            // The file either could not be read, or could not be saved to Parse.
            console.log(error);

        });

    },

    // TODO pass delete function to heroku server side and delete master key

    deleteFile(name){

         var obj = {
         method: 'DELETE',
         headers: {
         'X-Parse-Application-Id': secrets.parse.app_id,
         'X-Parse-Master-Key': secrets.parse.master_key
             }
         };

         fetch('https://api.parse.com/1/files/'+name, obj)
         .then(function(res) {

         console.log(res);

         return res.json();
         })
         .then(function(resJson) {
         console.log(resJson);
         });

    }

};

module.exports = Parse_Service;