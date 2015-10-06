
'use strict';
var key = 'AIzaSyCDa0BdgiroUvn0kSYIDpmojTO2u-Xtt7M';
var youtubeApi = {
    searchMusic(q){
        var url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=25&videoLicense=youtube&order=relevance&q='+q+'&type=video&videoCategoryId=10&key='+key;
        return fetch(url).then((res) => res.json());
    },
    getSongStats(q){

        var url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id='+q+'&key='+key;

        return fetch(url).then((res) => res.json());

    },
    searchChannel(q){
        var url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=11&videoLicense=youtube&order=relevance&q='+q+'&type=video&videoCategoryId=10&key='+key;

        return fetch(url).then((res) => res.json());
    },
    getChannels(q){

        var url = 'https://www.googleapis.com/youtube/v3/channels?part=id,brandingSettings,contentDetails,contentOwnerDetails,invideoPromotion,snippet,statistics,topicDetails&id='+q+'&key='+key;

        return fetch(url).then((res) => res.json());
    },
    getChannelOwner(q){

        var url = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id='+q+'&key='+key;

        return fetch(url).then((res) => res.json());

    },
    isVerified(q){

        var url = 'https://www.googleapis.com/plus/v1/people/'+q+'?fields=verified&key='+key;

        return fetch(url).then((res) => res.json());
    },
    getArtistUsername(token){

        var url = 'https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&key='+token;

        return fetch(url).then((res) => res.json());
    },
    checkIfUsernameExists(username){

        var url = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername='+username+'&key='+key;

        return fetch(url).then((res) => res.json());

    }
};


module.exports = youtubeApi;