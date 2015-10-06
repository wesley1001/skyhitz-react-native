'use strict';

var FirebaseRef = require('./firebase-ref');
var Promise = require('bluebird');
var User = require('./user');
var Uid = require('../../utils/services/generate-pushid');

var ListsApi ={
    topListCount : 0,
    hotListsCount : 0,
    pageSize : 15,
    entries : [],
    entriesLength:0,
    listsLength:0,
    getTopList(){

        return new Promise(function(resolve, reject){

            ListsApi.topListCount += ListsApi.pageSize;
            FirebaseRef.topList().
                startAt().limitToFirst(ListsApi.topListCount).once('value', function (snap) {

                    var entriesObj = snap.val();

                    if(entriesObj !== null) {
                        ListsApi.entriesLength = Object.keys(entriesObj).length;
                        console.log(ListsApi.entriesLength);

                        resolve(entriesObj);

                    }else{
                        resolve([]);
                    }

                },function(error){
                    if(error){
                        reject(error);
                    }
                });

        });
    },
    getHotLists(){

        return new Promise(function(resolve, reject){

            ListsApi.hotListsCount += ListsApi.pageSize;
            FirebaseRef.hotLists().
                startAt().limitToFirst(ListsApi.hotListsCount).once('value', function (snap) {

                    var listsObj = snap.val();

                    if(listsObj === null){

                        resolve([]);

                    }else{

                        ListsApi.listsLength = Object.keys(listsObj).length;

                        resolve(listsObj);

                    }

                },function(error){
                    if(error){
                        reject(error);
                    }
                });

        });

    },
    getList(listUid){

        return new Promise(function(resolve, reject){

            FirebaseRef.list(listUid).once('value', function (snap) {

                resolve(snap.val());

            });

            },function(error){
                if(error){
                    reject(error);
                }
            });

    },
    getUserPlaylists(){

        return new Promise(function(resolve, reject){

            // getting user playlists index
            var playlists = [];

            FirebaseRef.userPlaylists(User.getUid()).once('value', function (snap) {

                    var entriesObj = snap.val();

                    if(entriesObj !== null){

                    var listsLength = Object.keys(entriesObj).length;

                    for(var prop in entriesObj){

                        if (entriesObj.hasOwnProperty(prop)) {

                            FirebaseRef.list(prop).once('value', function (snap) {

                                if(snap.val() !== null){

                                    playlists.push(snap.val());
                                }

                                if (playlists.length === listsLength) {

                                    resolve(playlists);

                                }
                            });
                        }
                    }

                    }else{
                        resolve([]);
                    }

                },function(error){
                    if(error){
                        reject(error);
                    }
                });
        });

    },
    addEntryToPlaylist(list, entryUid){

        console.log(list);

        return new Promise(function(resolve, reject){

        var queue ={
            uid:User.getUid(),
            username:User.getUsername(),
            listUid:list.public.listUid,
            entryUid:entryUid
        };

        console.log(queue);

       FirebaseRef.addEntryToListQueue().push(queue, function(){

       });

        var hasReceivedResponseFromAppQueue = false;

       // watch changes on playlist

             var callback = function(snapshot){

                 console.log(snapshot.val());

                if (snapshot.val() == null) {
                    return;
                }

                if (hasReceivedResponseFromAppQueue){
                    return;
                }

                hasReceivedResponseFromAppQueue = true;
                FirebaseRef.addedEntryToPlaylistQueue(queue.listUid, queue.entryUid).off('value', callback);

                console.log(snapshot.val());

                resolve(snapshot.val());


            };

            var errorCallback = function(error){

                if(error){
                    reject(error.message);
                }

            };

            FirebaseRef.addedEntryToPlaylistQueue(queue.listUid, queue.entryUid).on('value',callback,errorCallback);

        });


    },
    getEntriesInList(entries){

        var entriesArr = [];
        var entriesLength = Object.keys(entries).length;

        return new Promise(function(resolve, reject){

            for(var prop in entries){

                if(entries.hasOwnProperty(prop)){

                    FirebaseRef.entryData(prop).once('value', function (snap) {

                        entriesArr.push(snap.val());

                        if (entriesArr.length === entriesLength) {

                            resolve(entriesArr);

                        }
                    });

                }

            }


        });

    },
    createList(list){

        return new Promise(function(resolve, reject){

              list.listUid = Uid.generate()();

              FirebaseRef.createListQueue().push(list, function (error) {

               });

            var hasReceivedResponseFromAppQueue = false;

            // watch changes on playlist

            var callback = function(snapshot){

                console.log(snapshot.val());

                if (snapshot.val() == null) {
                    return;
                }

                if (hasReceivedResponseFromAppQueue){
                    return;
                }

                hasReceivedResponseFromAppQueue = true;
                FirebaseRef.addedPlaylistQueue(list.uid, list.listUid).off('value', callback);

                console.log(list.listUid);

                resolve(list.listUid);


            };

            var errorCallback = function(error){

                if(error){
                    reject(error.message);
                }

            };

            FirebaseRef.addedPlaylistQueue(list.uid, list.listUid).on('value',callback,errorCallback);


        });

    },
    followList(list){

        return new Promise(function(resolve,reject){

            var followListQueue = {
                uid: User.getUid(),
                listUid: list.public.listUid,
                username: User.getUsername(),
                listAdminUid: list.public.uid,
                listAdminUsername: list.public.ownerName,
                follow:true
            };

            FirebaseRef.followListQueue().push(followListQueue,function(error){

                !error ? resolve('follow added') : reject(error);

            });

        });

    }

};

module.exports = ListsApi;