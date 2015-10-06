'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');
var Divider = require('../helpers/divider');
var Slider = require('react-native-slider');
var YouTube = require('react-native-youtube');
var NavBar = require('../navbar/navbar');
var EntryApi = require('../../utils/services/entry');
var EntryTitle = require('../../utils/entrytitle');
var User = require('../../utils/services/user');
var Subscribable = require('Subscribable');
var Player = require('../player/player');

var {
    StyleSheet,
    View,
    Text,
    Navigator,
    WebView,
    TouchableOpacity,
    TouchableHighlight,
    NativeModules,
    PixelRatio,
    Component,
    Image
    } = React;

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#111111',
        flex: 1
    },
    youtubePlayer: {
        alignSelf: 'stretch',
        height: 180,
        backgroundColor: 'black'
    },
    slideWrap: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    header: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    prizeIcon: {
        marginRight: 15
    },
    prizeImage: {
        height: 17,
        width: 17
    },
    entryName: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Gotham-Bold',
        color: '#626363'
    },
    entryArtist: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Gotham-Book',
        color: '#626363'
    },
    points: {
        fontSize: 18,
        fontFamily: 'Gotham-Book',
        color: '#1eaeff'
    },
    controls: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    rowControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap',
        marginBottom:40
    },
    controlTouch: {
        alignSelf: 'center'
    },
    controImage: {},
    rowVol: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        marginBottom: 10
    },
    loopBtn: {
        width: 21,
        height: 16.5
    },
    rewindBtn: {
        width: 28,
        height: 18
    },
    forwardBtn: {
        width: 28,
        height: 18
    },
    playBtn: {
        width: 20,
        height: 23
    },
    shuffleBtn: {
        width: 21,
        height: 18
    },
    muteBtn: {
        width: 8,
        height: 18.4
    },
    loudBtn: {
        width: 16.8,
        height: 14.4
    },
    controlVol: {},
    rowShare: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        height: 30
    },
    likedBy: {
        fontSize: 12,
        color: '#626363',
        flex: 1,
        paddingTop: 9

    },
    likecomment: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexWrap: 'nowrap',
        flex: 1
    },
    social: {},
    likesNum: {
        fontSize: 12,
        color: '#626363',
        marginLeft: 10
    },
    likeImage: {
        width: 23,
        height: 23,
        marginLeft: 7
    },
    commentNum: {
        fontSize: 12,
        color: '#626363',
        marginLeft: 10
    },
    commentImage: {
        width: 23,
        height: 21,
        marginLeft: 7
    },
    friendsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        marginTop: 15
    },
    friend: {
        marginRight: 7
    },
    friendImage: {},
    plusFriendsCircle: {
        borderRadius: 30 / PixelRatio.get(),
        width: 30,
        height: 30,
        backgroundColor: '#9a9999',
        marginTop: 15
    },
    plusFriends: {
        color: 'white',
        fontFamily: 'Gotham-Book',
        fontSize: 10,
        textAlign: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        paddingTop: 10
    },
    titleWrap: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    profilepic: {
        borderRadius: 30 / PixelRatio.get(),
        width: 30,
        height: 30
    },
    bottomWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        marginBottom: 10,
        alignItems: 'flex-end'
    },
    wrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        flex: 1
    },
    brandName: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Gotham-Light',
        marginLeft: 9
    },
    customNav: {
        height: 64,
        backgroundColor: '#111111',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    track: {
        height: 2,
        borderRadius: 1,
        backgroundColor: '#909090'
    },
    thumb: {
        width: 4,
        height: 20,
        borderRadius: 1,
        backgroundColor: '#1dadff'
    },
    volTrack: {
        height: 2,
        backgroundColor: '#303030'
    },
    volThumb: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        shadowOpacity: 0.35,
    }

});


var Entry = React.createClass({
    mixins: [Subscribable.Mixin],
    getInitialState(){
        return {
            entryUid: '',
            volumex: 0,
            progress: 0,
            duration: 0,
            status: null,
            playTime: null,
            isPlaying: true,
            liked: false,
            loop:true,
            shuffle:true,
            title: '',
            points: 0,
            likeCount: 0,
            commentCount: 0,
            likers: []
        }
    },
    indexEntry(youtubeData){
        EntryApi.indexEntry(youtubeData).then(() => {
            this.getEntryInfo(this.state.entryUid);
            this.getLikeInfo(this.state.entryUid);
        });
    },
    loadVideo(args){
        this.setState({entryUid: args.videoUid, title: args.videoTitle, isPlaying:true});
        if (args.youtubeData) {
            this.indexEntry(args.youtubeData);
        } else {
            this.getEntryInfo(args.videoUid);
            this.getLikeInfo(args.videoUid);
        }
    },
    playVideo(){
        this.setState({isPlaying: true});
    },
    pauseVideo(){
        this.setState({isPlaying: false});
    },
    componentDidMount(){
        this.addListenerOn(Player.eventEmitter, 'loadVideo', this.loadVideo);
        this.addListenerOn(Player.eventEmitter, 'playVideo', this.playVideo);
        this.addListenerOn(Player.eventEmitter, 'pauseVideo', this.pauseVideo);
    },
    getEntryInfo(entryUid){
        var that = this;
        EntryApi.getEntryData(entryUid).then(function (entryData) {
            console.log('entryInfoLoaded');
            if (entryData.hasOwnProperty('youtubeData')) {
                that.setState({
                    points: entryData.points,
                    likeCount: entryData.likeCount,
                    commentCount: entryData.commentCount
                });
            }
        });
    },
    getLikeInfo(entryUid){
        var that = this;
        EntryApi.getEntryLikers(entryUid).then(function (likersData) {
            console.log('likeInfoLoaded');
            if (likersData.hasOwnProperty('likedByUser')) {
                that.setState({liked: true});
            }
            that.setState({likers: likersData});
        });
    },
    likeUnlikeEntry(){
        if (this.state.liked === false) {
            this.setState({liked: true, likeCount: this.state.likeCount + 1});
            EntryApi.likeEntry(this.state.entryUid);
        } else {
            this.setState({liked: false, likeCount: this.state.likeCount - 1});
            EntryApi.unLikeEntry(this.state.entryUid);
        }
    },
    renderLike(){
        if (this.state.liked) {
            return <Image style={styles.likeImage} source={require('image!like-icon-blue')}/>;
        } else {
            return <Image style={styles.likeImage} source={require('image!like-icon-grey')}/>;
        }
    },
    renderLikers(){

        if (!this.state.likers) {
            return null;
        }
        return this.state.likers.map((liker) =>
            <View style={styles.friend}>
                <Image style={styles.profilepic}
                       source={liker.smallAvatarUrl == "placeholder" ? require('image!avatar'):{uri:liker.smallAvatarUrl}}/>
            </View>);

    },
    renderMoreLikers(){
        if (this.state.likers.hasOwnProperty('moreLikers')) {
            return (
                <TouchableHighlight style={styles.plusFriendsCircle}
                                    onPress={()=>Router.goToLikers(this.state.entryUid)}>
                    <Text
                        style={styles.plusFriends}>+{this.state.likers.moreLikers ? this.state.likers.moreLikers : ''}</Text>
                </TouchableHighlight>);
        }
    },
    renderPlayBtn(){
        if (this.state.status == 'playing') {
            return (
                <TouchableOpacity style={styles.controlTouch}
                                  onPress={()=>{this.setState({isPlaying: false})}}>
                    <Image style={styles.playBtn} source={require('image!pausebtn')}/>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.controlTouch}
                                  onPress={()=>{this.setState({isPlaying: true})}}>
                    <Image style={styles.playBtn} source={require('image!playbtn')}/>
                </TouchableOpacity>
            )
        }
    },
    seekToSeconds(fractionValue){
        var seconds = fractionValue * this.state.duration;
        NativeModules.YouTubeManager.seekTo(
            React.findNodeHandle(this.refs.youtubeplayer),
            parseFloat(seconds)
        );
    },
    setVolume(volume){
        var intVolume = Math.round(volume * 100);
        console.log(intVolume);
        this.setState({volumex: volume});
        NativeModules.YouTubeManager.setVolume(
            React.findNodeHandle(this.refs.youtubeplayer),
            intVolume
        );
    },
    renderEntryPrize(entry){
        if (entry) {
            return (
                <TouchableOpacity style={styles.prizeIcon}>
                    <Image style={styles.prizeImage} source={require('image!diamond')}/>
                </TouchableOpacity>
            )
        }
    },
    renderLoop(){
        if(this.state.loop === true){
            return(
                <TouchableOpacity style={styles.controlTouch} onPress={()=>this.setState({loop:false})}>
                    <Image style={styles.loopBtn} source={require('image!loop-icon-blue')}/>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity style={styles.controlTouch} onPress={()=>this.setState({loop:true})}>
                    <Image style={styles.loopBtn} source={require('image!loop-icon-grey')}/>
                </TouchableOpacity>
            )
        }
    },
    renderShuffle(){
        if(this.state.shuffle === true){
            return(
                <TouchableOpacity style={styles.controlTouch} onPress={()=>this.setState({shuffle:false})}>
                    <Image style={styles.shuffleBtn} source={require('image!shuffle-icon-blue')}/>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity style={styles.controlTouch} onPress={()=>this.setState({shuffle:true})}>
                    <Image style={styles.shuffleBtn} source={require('image!shuffle-icon-grey')}/>
                </TouchableOpacity>
            )
        }
    },
    render(){
        return (
            <View style={styles.container}>
                <NavBar downBtn={true} backBtn={false} fwdBtn={false} logoType={true} transparentBackground={false}
                        menuBtn={true}/>
                <YouTube
                    videoId={this.state.entryUid} // The YouTube video ID
                    play={this.state.isPlaying}           // control playback of video with true/false
                    hidden={false}        // control visiblity of the entire view
                    playsInline={true}    // control whether the video should play inline
                    onReady={(e)=>{this.setState({isReady: true})}}
                    onChangeState={(e)=>{this.setState({status: e.state});Player.onChangeState(e.state)}}
                    onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
                    onError={(e)=>{this.setState({error: e.error})}}
                    onPlayTime={(e)=>{this.setState({playTime: e.playTime, progress:e.playTime/e.duration, duration:e.duration})}}
                    style={styles.youtubePlayer}
                    ref="youtubeplayer"
                    />
                <Slider
                    value={this.state.progress}
                    onValueChange={(value) => this.seekToSeconds(value)} trackStyle={styles.track}
                    thumbStyle={styles.thumb}
                    minimumTrackTintColor='#626363'
                    />
                <View style={styles.wrapper}>
                    <View style={styles.row}>
                        <View style={styles.titleWrap}>
                            {this.renderEntryPrize()}
                            <Text style={styles.entryName}>{EntryTitle.getArtistName(this.state.title)}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.entryArtist}>{EntryTitle.getSongTitle(this.state.title)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.points}>{this.state.points == 0 ? "" : (this.state.points + " pts")}</Text>
                    </View>
                    <View style={styles.rowControls}>
                        {this.renderLoop()}
                        <TouchableOpacity style={styles.controlTouch}>
                            <Image style={styles.rewindBtn} source={require('image!rewindbtn')}/>
                        </TouchableOpacity>
                        {this.renderPlayBtn()}
                        <TouchableOpacity style={styles.controlTouch}>
                            <Image style={styles.forwardBtn} source={require('image!forwardbtn')}/>
                        </TouchableOpacity>
                        {this.renderShuffle()}
                    </View>

                    <View>
                        <View style={styles.bottomRowWrap}>
                            <View style={styles.rowShare}>
                                <Text style={styles.likedBy}>LIKED BY</Text>
                                <View style={styles.likecomment}>
                                    <TouchableOpacity style={styles.social}
                                                      onPress={()=>Router.goToLikers(this.state.entryUid)}>
                                        <Text style={styles.likesNum}>{this.state.likeCount}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.social} onPress={this.likeUnlikeEntry}>
                                        {this.renderLike()}
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.social}
                                                      onPress={()=>Router.goToComments(this.state.entryUid)}>
                                        <Text style={styles.commentNum}>{this.state.commentCount}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.social}
                                                      onPress={()=>Router.goToComments(this.state.entryUid)}>
                                        <Image style={styles.commentImage} source={require('image!comment')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Divider/>
                        </View>
                        <View style={styles.bottomWrap}>
                            <View style={styles.friendsRow}>
                                {this.renderLikers()}
                            </View>
                            {this.renderMoreLikers()}
                        </View>
                    </View>
                </View>

            </View>


        )
    }
});


module.exports = Entry;

/*
 <View style={styles.rowVol}>
 <TouchableOpacity style={styles.controlVol}>
 <Image style={styles.muteBtn} source={require('image!mutebtn')}/>
 </TouchableOpacity>
 <View style={styles.slideWrap}>
 <Slider
 value={this.state.volumex}
 onValueChange={(volume) => this.setVolume(volume)} trackStyle={styles.volTrack}
 minimumTrackTintColor="#1dadff" thumbStyle={styles.volThumb}/>
 </View>
 <TouchableOpacity style={styles.controlVol}>
 <Image style={styles.loudBtn} source={require('image!loudbtn')}/>
 </TouchableOpacity>
 </View>

 */