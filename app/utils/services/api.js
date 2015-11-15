// Remember to change the url that points to the production firebase

var FirebaseRef = require('../../utils/services/firebase-ref');
var Promise = require('bluebird');
var API_URL = require('../../config/env').API_URL;
var User = require('../services/user');

'use strict';

var Api = {
  homeFeedUrl(uid){
    return API_URL + '/feed/home/'+uid
  },
  profileFeedUrl(uid){
    return API_URL + '/feed/profile/'+uid
  },
  getFollowers(uid){
    return API_URL + '/followers/' + uid + '?requester_uid=' + User.getUid();
  }
};

module.exports = Api;

