'use strict';

var FirebaseRef = require('./firebase-ref');
var Promise = require('bluebird');
var youtubeApi = require('./youtubeapi');
var User = require('../../utils/services/user');

var Entry = {
  entryData: null,
  checkIfEntryExists(entryUid){
    return new Promise(function (resolve, reject) {
      FirebaseRef.entry(entryUid).once('value', function (snap) {
        resolve(snap.val() ? true : false);
      }, function (error) {
        error ? reject(error) : '';
      });
    });
  },
  watchIfEntryWasIndexed(entryUid, resolve, reject){
    var hasReceivedResponseFromAppQueue = false;
    var callback = function (snapshot) {
      if (snapshot.val() == null) {
        return;
      }
      if (hasReceivedResponseFromAppQueue) {
        return;
      }
      hasReceivedResponseFromAppQueue = true;
      FirebaseRef.entry(entryUid).off('value', callback);
      resolve();
    };
    var errorCallback = function (error) {
      if (error) {
        reject();
      }
    };
    FirebaseRef.entry(entryUid).on('value', callback, errorCallback);
  },
  indexEntry(youtubeData){
    var that = this;
    var entry = {};
    entry.youtubeData = youtubeData;
    entry.id = youtubeData.id.videoId;
    return new Promise(function (resolve, reject) {
      Entry.checkIfEntryExists(entry.id).then(function (bool) {
        if (bool) {
          resolve();
        } else {
          entry.uid = User.getUid();
          youtubeApi.getSongStats(entry.id).then(function (stats) {
            entry.youtubeData.statistics = stats.items[0].statistics;
            FirebaseRef.addEntryQueue().push(entry, function (error) {
              error ? reject(error) : that.watchIfEntryWasIndexed(entry.id, resolve, reject);
            });
          });
        }
      });
    });
  },
  indexArtist(youtubeData){
    var that = this;
    var entry = {};
    entry.youtubeData = youtubeData;
    entry.id = youtubeData.id.videoId;
    return new Promise(function (resolve, reject) {
      Entry.checkIfEntryExists(entry.id).then(function (bool) {
        if (bool) {
          resolve();
        } else {
          entry.uid = 'facebook:20001';
          youtubeApi.getSongStats(entry.id).then(function (stats) {
            entry.youtubeData.statistics = stats.items[0].statistics;
            FirebaseRef.addEntryQueue().push(entry, function (error) {
              error ? reject(error) : that.watchIfEntryWasIndexed(entry.id, resolve, reject);
            });
          });
        }
      });
    });
  },
  getLikers(entryUid){
    var likers = [];
    return new Promise(function (resolve, reject) {
      FirebaseRef.entryLikers(entryUid).once('value', function (snapshot) {
        if (snapshot.val() !== null) {
          var likersUids = snapshot.val();
          var likersUidsLength = Object.keys(likersUids).length;
          for (var prop in likersUids) {
            if (likersUids.hasOwnProperty(prop)) {
              FirebaseRef.userData(prop).once('value', function (liker) {
                if (liker.val() !== null) {
                  likers.push(liker.val());
                }
                if (likersUidsLength == likers.length) {
                  resolve(likers);
                }
              });
            }
          }
        }
      }, function (error) {
        error ? reject(error) : '';
      });
    });
  },
  getComments(entryUid){
    var comments = [];
    return new Promise(function (resolve, reject) {
      FirebaseRef.entryComments(entryUid).once('value', function (snapshot) {
        if (snapshot.val() !== null) {
          var commentsObj = snapshot.val();
          var uids = {};
          var users = {};
          var commentsReady = false;
          for (var prop in commentsObj) {
            if (commentsObj.hasOwnProperty(prop)) {
              var uid = commentsObj[prop].uid;
              uids[uid] = true;
            }
          }
          var uidsLength = Object.keys(uids).length;
          for (var propx in uids) {
            if (uids.hasOwnProperty(propx)) {
              FirebaseRef.userData(propx).once('value', function (userSnap) {
                if (userSnap.val() !== null) {
                  users[userSnap.val().uid] = userSnap.val();
                  var usersLength = Object.keys(users).length;
                  if (uidsLength === usersLength) {
                    for (var prop in commentsObj) {
                      if (commentsObj.hasOwnProperty(prop)) {
                        var comment = commentsObj[prop];
                        comment.user = users[comment.uid];
                        comments.unshift(comment);
                      }
                    }
                    resolve(comments);
                  }
                }
              });
            }
          }
        } else {
          console.log(snapshot.val());
          resolve([]);
        }
      }, function (error) {
        error ? reject(error) : '';
      });
    });
  },
  sendComment(comment, entryUid){
    var commentObj = {
      uid: User.getUid(),
      comment: comment,
      entryUid: entryUid
    };
    FirebaseRef.sendCommentQueue().push(commentObj);
  },
  likeEntry(entryUid){
    FirebaseRef.likeEntryQueue().push({like: true, entryUid: entryUid, uid: User.getUid()});
  },
  unLikeEntry(entryUid){
    FirebaseRef.likeEntryQueue().push({like: false, entryUid: entryUid, uid: User.getUid()});
  },
  getEntryData(entryUid){
    return new Promise(function (resolve, reject) {
      FirebaseRef.entryData(entryUid).once('value', function (snap) {
        if (snap.val() !== null) {
          resolve(snap.val());
        } else {
          reject();
        }
      });
    });
  },
  getEntryLikers(entryUid){
    var likers = [];
    return new Promise(function (resolve, reject) {
      FirebaseRef.entryLikers(entryUid).once('value', function (snapshot) {
        if (snapshot.val() !== null) {
          var likersUids = snapshot.val();
          var likersUidsLength = Object.keys(likersUids).length;
          for (var prop in likersUids) {
            if (likersUids.hasOwnProperty(prop)) {
              FirebaseRef.userData(prop).once('value', function (liker) {
                if (liker.val() !== null) {
                  if (liker.val().uid == User.getUid()) {
                    likers.likedByUser = true;
                  }
                  if (likers.length < 6) {
                    likers.push(liker.val());
                  }
                  if (likersUidsLength == likers.length) {
                    resolve(likers);
                  }
                  if (likers.length === 6) {
                    likers.moreLikers = likersUidsLength - 6;
                    if (likers.moreLikers > 999) {
                      likers.moreLikers = false;
                    }
                    resolve(likers);
                  }
                }
              });
            }
          }
        } else {
          resolve([]);
        }
      }, function (error) {
        error ? reject(error) : '';
      });
    });
  },
  addPoints(entryUid, points){
    var pointsPayload = {
      uid: User.getUid(),
      entryUid: entryUid,
      pointsAmount: parseInt(points),
      username: User.getUsername(),
      added: true
    };
    return new Promise(function (resolve, reject) {
      FirebaseRef.entryPointsQueue().push(pointsPayload, function (error) {
        error ? reject(error) : Entry.watchIfPointsWereAdded(entryUid, resolve,reject);
      });
    });
  },
  watchIfPointsWereAdded(entryUid, resolve, reject){
    var hasReceivedResponseFromAppQueue = false;
    var callback = function (snapshot) {
      if (snapshot.val() == null) {
        return;
      }
      if (hasReceivedResponseFromAppQueue) {
        return;
      }
      hasReceivedResponseFromAppQueue = true;
      FirebaseRef.entryRelevance(entryUid).off('value', callback);
      resolve();
    };
    var errorCallback = function (error) {
      if (error) {
        reject();
      }
    };
    FirebaseRef.entryRelevance(entryUid).on('value', callback, errorCallback);
  }
};

module.exports = Entry;