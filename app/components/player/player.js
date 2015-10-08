'use strict';

var React = require('react-native');
var EventEmitter = require('EventEmitter');

var Player = {
    eventEmitter: new EventEmitter(),
    currentVideoId:'',
    currentList:[],
    indexInList:0,
    status:'',
    getNextIndex(){
        var lastIndex = Player.currentList.length - 1;
        if(lastIndex == Player.indexInList){
            return 0;
        }else{
            return parseFloat(Player.indexInList) + 1;
        }
    },
    getRandomIndex() {
        return Math.floor(Math.random() * (Player.currentList.length - 1))
    },
    isPlaying(){
        if (Player.status === 'playing'){
            return true
        } else {
            return false
        }
    },
    playNext(){
        if(Player.currentList.length === 0){
            Player.pauseCurrentVideo();
        }else{
            var nextVideo = Player.currentList[Player.getNextIndex()];
            Player.loadVideo(nextVideo.youtubeData.id.videoId, nextVideo.youtubeData.snippet.title, nextVideo.youtubeData)
        }
    },
    playRandom(){
        var shuffleVideo = Player.currentList[Player.getRandomIndex()];
        Player.loadVideo(shuffleVideo.youtubeData.id.videoId, shuffleVideo.youtubeData.snippet.title, shuffleVideo.youtubeData)
    },
    isPaused(){
        //
    },
    seekToSeconds(){

    },
    onChangeState(state){
        Player.eventEmitter.emit('changeState',{state:state});
    },
    loadVideo(videoUid, videoTitle, youtubeData){
        Player.eventEmitter.emit('loadVideo', { videoUid: videoUid, videoTitle:videoTitle, youtubeData:youtubeData });
        Player.currentVideoId = videoUid;
        Player.eventEmitter.emit('showTabPlayer', { showTabPlayer: true });
        Player.eventEmitter.emit('currentVideoId', { currentVideoId: videoUid });
    },
    playVideo(videoUid, videoTitle, youtubeData){
        if (Player.currentVideoId === videoUid){
            Player.showPlayer();
        } else {
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

