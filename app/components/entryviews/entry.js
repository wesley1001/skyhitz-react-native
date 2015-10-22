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
var BlurView = require('react-native-blur').BlurView;
var Dimensions = require('Dimensions');

var {
    StyleSheet,
    View,
    Text,
    Navigator,
    WebView,
    AlertIOS,
    ActionSheetIOS,
    TouchableOpacity,
    TouchableHighlight,
    NativeModules,
    PixelRatio,
    Component,
    Image
    } = React;

var styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1
    },
    blur: {
        height:Dimensions.get('window').height
    },    
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },    
    youtubePlayer: {
        alignSelf: 'stretch',
        height: 180,
        backgroundColor: 'white'
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
        fontFamily: 'Avenir',
        color: 'white',
        fontWeight: 'bold'
    },
    entryArtist: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Avenir',
        color: 'white'
    },
    points: {
        fontSize: 16,
        fontFamily: 'Avenir',
        color: '#1eaeff',
        fontWeight: 'bold'
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
        width: 24,
        height: 18
    },
    forwardBtn: {
        width: 24,
        height: 18
    },
    playBtn: {
        width: 25,
        height: 25,
    },
    playBtnContainer: {
        padding:30,
        borderWidth:1.5,
        borderColor:'white',
        borderRadius:60
    },    
    ctrlBtnContainer: {
        padding:25,
        borderRadius:40
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
    rowShare: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        height: 30
    },
    likedBy: {
        fontSize: 12,
        color: 'white',
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
        color: 'white',
        marginLeft: 10,
    },
    likeImage: {
        width: 23,
        height: 23,
        marginLeft: 7,
    },
    commentNum: {
        fontSize: 12,
        color: 'white',
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
        marginTop: 15,
    },
    plusFriends: {
        color: 'white',
        fontFamily: 'Avenir',
        fontSize:12,
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
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        flex: 1
    },
    brandName: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Avenir',
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
        backgroundColor: '#edf1f2',
        shadowColor: 'white',
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
            loop:false,
            shuffle:false,
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
                    <Text style={styles.plusFriends}>+{this.state.likers.moreLikers ? this.state.likers.moreLikers : ''}</Text>
                </TouchableHighlight>);
        }
    },
    renderPlayBtn(){
        if (this.state.status == 'playing') {
            return (
                <TouchableOpacity style={styles.controlTouch}
                                  onPress={()=>{this.setState({isPlaying: false})}}>
                          <View style={styles.playBtnContainer}>
                                <Image style={styles.playBtn} source={require('image!pausebtnwhite')}/>                                  
                          </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.controlTouch}
                                  onPress={()=>{this.setState({isPlaying: true})}}>
                          <View style={styles.playBtnContainer}>
                                <Image style={styles.playBtn} source={require('image!playbtnwhite')}/>                                  
                          </View>
                </TouchableOpacity>
            )
        }
    },
    confirmTransaction(points){
      EntryApi.addPoints(this.state.selectedEntryUid, points);
    },
    promptResponse(promptValue) {
      if(User.userData.points < promptValue){
        AlertIOS.alert(
          null,
          "You don't have enough points in your account."
        )
      }else{
        AlertIOS.alert(
          null,
          promptValue+ " Points will be added to this song.",
          [
            {text: 'Cancel', onPress: () => console.log('cancelled')},
            {text: 'Confirm', onPress: () => this.confirmTransaction(promptValue)}
          ]
        )
      }
    },
    addPoints(entryUid) {
      this.setState({selectedEntryUid: entryUid});
      var title = 'How many Skyhitz points would you like to add to this song? 1 USD = 1 POINT.';
      var points = '1';
      AlertIOS.prompt(title, points, this.promptResponse);
    },
    showShareActionSheet() {
      ActionSheetIOS.showShareActionSheetWithOptions({
          url: 'https://code.facebook.com',
        },
        (error) => {
          console.error(error);
        },
        (success, method) => {
          var text;
          if (success) {
            text = `Shared via ${method}`;
          } else {
            text = 'You didn\'t share';
          }
          this.setState({text})
        });
    },
    showActionSheet() {
      var BUTTONS = [
        'Add Points',
        'Add to a Playlist',
        'Share Song...',
        'Cancel'
      ];
      var DESTRUCTIVE_INDEX = 3;
      var CANCEL_INDEX = 4;

      ActionSheetIOS.showActionSheetWithOptions({
          options: BUTTONS,
          //  cancelButtonIndex: CANCEL_INDEX,
          destructiveButtonIndex: DESTRUCTIVE_INDEX
        },
        (buttonIndex) => {

          switch (buttonIndex){
            case 0:
              this.addPoints(this.state.entryUid);
              break;
            case 1:
              Router.addToPlaylist(this.state.entryUid);
              break;
            case 2:
              this.showShareActionSheet();
              break;
            default :
              return;
          }
        });
    },
    seekToSeconds(fractionValue){
        var seconds = fractionValue * this.state.duration;
        NativeModules.YouTubeManager.seekTo(
            React.findNodeHandle(this.refs.youtubeplayer),
            parseFloat(seconds)
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
    toggleLoop(){
        if(this.state.loop === true){
            this.setState({loop:false})
        }else{
            this.setState({loop:true})
        }
    },
    handleStateChange(state){
        if(state === 'ended'){
            if(this.state.loop === true){
                this.seekToSeconds(0)
            }else if(this.state.shuffle === true){
                Player.playRandom()
            }else{
                Player.playNext()
            }
        }
        this.setState({status:state});
    },
    renderLoop(){
        if(this.state.loop === true){
            return(
                <TouchableOpacity style={styles.controlTouch} onPress={()=>this.toggleLoop()}>
                    <Image style={styles.loopBtn} source={require('image!loop-icon-blue')}/>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity style={styles.controlTouch} onPress={()=>this.toggleLoop()}>
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
                <Image style={styles.bg} source={require('image!iosblur')}>

            <View style={styles.container}>
                <BlurView blurType="dark" style={styles.blur}>

                <NavBar downBtn={true} backBtn={false} fwdBtn={false} logoType={true} transparentBackground={true}
                        menuBtn={true} menuPressFunc={this.showActionSheet}/>
                <YouTube
                    videoId={this.state.entryUid} // The YouTube video ID
                    play={this.state.isPlaying}           // control playback of video with true/false
                    hidden={false}        // control visiblity of the entire view
                    playsInline={true}    // control whether the video should play inline
                    onReady={(e)=>{this.setState({isReady: true})}}
                    onChangeState={(e)=>{this.handleStateChange(e.state);Player.onChangeState(e.state)}}
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
                    minimumTrackTintColor='white'
                    />
                <View style={styles.wrapper}>
                    <View style={styles.row}>
                        <View style={styles.titleWrap}>
                            {this.renderEntryPrize()}
                            <Text style={styles.entryName}>{EntryTitle.getSongTitle(this.state.title)}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.entryArtist}>{EntryTitle.getArtistName(this.state.title)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.points}>{this.state.points == 0 ? "" : (this.state.points + " pts")}</Text>
                    </View>
                    <View style={styles.rowControls}>
                        {this.renderLoop()}
                        <TouchableOpacity style={styles.controlTouch}>
                            <View style={styles.ctrlBtnContainer}>                        
                                <Image style={styles.rewindBtn} source={require('image!rewindbtnwhite')}/>
                            </View>
                        </TouchableOpacity>
                        {this.renderPlayBtn()}
                        <TouchableOpacity style={styles.controlTouch}>
                            <View style={styles.ctrlBtnContainer}>                                                
                                <Image style={styles.forwardBtn} source={require('image!forwardbtnwhite')}/>
                            </View>    
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
                </BlurView>
            </View>
</Image>

        )
    }
});


module.exports = Entry;
