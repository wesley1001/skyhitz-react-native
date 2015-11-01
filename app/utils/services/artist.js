'use strict';

var FirebaseRef = require('./firebase-ref');
var Promise = require('bluebird');
var Users = require('../../utils/services/users');

var Artist = {
  indexArtist(youtubeData){
    Users.checkIfArtistUserExists(youtubeData.snippet.channelId).then((bool)=>{
      console.log(bool);
      var payload = {
        channelId:youtubeData.snippet.channelId
      };
      if(bool === false){
        FirebaseRef.addArtist().push(payload)
      }
    })
  }
};

module.exports = Artist;
