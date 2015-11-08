// Remember to change the url that points to the production firebase

var FirebaseRef = require('../../utils/services/firebase-ref');
var Promise = require('bluebird');
var API_URL = require('../../config/env').API_URL;

'use strict';

var Api = {
  homeFeedUrl(uid){
    return API_URL + '/feed/home/'+uid
  }
};

module.exports = Api;

