'use strict';

var React = require('react-native');
var EventEmitter = require('EventEmitter');

var Player = {
    eventEmitter: new EventEmitter(),
    currentVideoId:'',
    status:'',
    isPlaying(){
        if(Player.status === 'playing'){
            return true
        }else{
            return false
        }
    },
    isPaused(){
        //
    },
    seekToSeconds(){

    },
    onChangeState(state){
        console.log(state);
        Player.eventEmitter.emit('changeState',{state:state});
    },
    loadVideo(videoUid, videoTitle, youtubeData){
        Player.eventEmitter.emit('loadVideo', { videoUid: videoUid, videoTitle:videoTitle, youtubeData:youtubeData });
        Player.currentVideoId = videoUid;
        Player.eventEmitter.emit('showTabPlayer', { showTabPlayer: true });
    },
    playVideo(videoUid, videoTitle, youtubeData){
        if(Player.currentVideoId === videoUid){
            Player.showPlayer();
        }else{
            Player.loadVideo(videoUid, videoTitle, youtubeData);
            Player.showPlayer();
        }
    },
    playCurrentVideo(){
        Player.eventEmitter.emit('playVideo');
    },
    pauseCurrentVideo(){
        Player.eventEmitter.emit('pauseVideo');
    },
    showPlayer(){
        Player.eventEmitter.emit('showPlayer', { showPlayer: true });
    },
    hidePlayer(){
        Player.eventEmitter.emit('hidePlayer', { hidePlayer: true });
    }
};

module.exports = Player;

