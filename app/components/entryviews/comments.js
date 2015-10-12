'use strict';

var React = require('react-native');
var NavBar = require('../navbar/navbar');
var Router = require('../../utils/services/router');
var HomeFeedDivider = require('../helpers/homefeeddivider');
var EntryApi = require('../../utils/services/entry');
var User = require('../../utils/services/user');
var BackBtn = require('../navbar/backbtn');
var Divider = require('../helpers/searchdivider');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Follow = require('../follow/follow');
var KeyboardEvents = require('react-native-keyboardevents');
var KeyboardEventEmitter = KeyboardEvents.Emitter;
var InvertibleScrollView = require('react-native-invertible-scroll-view');
var Time = require('../../utils/time');

var {
    StyleSheet,
    Navigator,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    LayoutAnimation,
    Image,
    PixelRatio,
    TextInput,
    ListView,
    Component
    } = React;

var styles = StyleSheet.create({
    navBarRightButton: {
        marginLeft: 10,
        width:11.5,
        height:19.5
    },
    playlistIcon:{
        width:10.5,
        height:11.9
    },
    logo:{
        width:30.24,
        height:24.48
    },
    container:{
        backgroundColor:'#111111',
        flex:1
    },
    wrapper:{
        flex:1
    },
    customNav:{
        height:64,
        backgroundColor:'#111111',
        paddingTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    brandName:{
        fontSize:20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily:'Avenir'
    },
    logoType:{
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'nowrap',
        marginTop:7
    },
    listview:{
        backgroundColor: '#edf1f2',
        flex:1
    },
    thumb:{
        width:40,
        height:30
    },
    thumbRound:{
        width:40,
        height:40,
        borderRadius:20
    },
    row:{
        flex:1,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor: '#edf1f2'
    },
    leftSection:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flex:1
    },
    rowWrapp:{
        flex:1,
        backgroundColor: '#edf1f2'
    },
    searchArtistTitle:{
        fontSize:12,
        fontFamily:'Avenir',
        textAlign:'left',
        paddingLeft:10,
        flex:1
    },
    title:{
        fontSize:12,
        fontFamily:'Avenir',
        textAlign:'left',
        paddingLeft:10,
        marginTop:2,
        flex:1
    },
    blankSpace:{
        backgroundColor:'transparent',
        width:11.5,
        height:19.5,
        marginRight:10
    },
    infoWrap:{
        flex:1
    },
    commentInputWrap:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        height:50,
        backgroundColor:'#dddddd'
    },
    commentInput:{
        flex:1,
        marginLeft:10,
        marginTop:10,
        backgroundColor: '#edf1f2',
        height:30,
        borderRadius:4,
        marginRight:10,
        paddingLeft:10,
        fontFamily:'Avenir'
    },
    commentSend:{
        marginRight:10,
        marginTop:10,
        width:80,
        height:30,
        backgroundColor:'#1dadff',
        borderRadius:4
    },
    sendComment:{
        textAlign:'center',
        alignSelf:'center',
        fontFamily:'Avenir',
        color:'white',
        marginTop:8
    },
    timeStamp:{
        color:'#cfcdcd',
        fontFamily:'Avenir',
        fontSize:11
    }

});

var animations = {
    layout: {
        spring: {
            duration: 400,
            create: {
                duration: 300,
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 400,
            },
        },
        easeInEaseOut: {
            duration: 400,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        },
    },
};

var Comments = React.createClass({
    getInitialState() {
        return {
            commentsDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            comments:[],
            entryUid: Router.route.entryUid,
            keyboardSpace: 0,
            comment:''
        }
    },
    getCommentsDataSource: function(data: Array<any>): ListView.DataSource {
        return this.state.commentsDataSource.cloneWithRows(data);
    },
    updateKeyboardSpace: function(frames) {
        LayoutAnimation.configureNext(animations.layout.spring);
        this.setState({keyboardSpace: frames.end.height});
    },
    resetKeyboardSpace: function() {
        LayoutAnimation.configureNext(animations.layout.spring);
        this.setState({keyboardSpace: 0});
    },
    componentDidMount: function() {
        KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
        KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
    },
    componentWillMount () {
        this.getComments();
        KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
        KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
    },
    goToProfile(item){
        this.props.navigator.push({
            id:'profile'
        })
    },
    getComments(){
        var that = this;
        EntryApi.getComments(this.state.entryUid).then(function(comments){

           that.state.comments = comments;

            console.log(comments);

            that.setState({
                isLoading: false,
                commentsDataSource: that.getCommentsDataSource(comments)
            });
        });
    },
    sendComment(){

        EntryApi.sendComment(this.state.comment, this.state.entryUid);

        var commentObj ={
            comment:this.state.comment,
            creationTimestamp:Math.floor(Date.now()),
            entryUid:this.state.entryUid,
            uid:User.getUid(),
            user:User.userData
        };

        var newComments = this.state.comments;

        newComments.unshift(commentObj);

        this.setState({
            isLoading: false,
            comment:"",
            commentsDataSource: this.getCommentsDataSource(newComments)
        });

        this.refs.commentsView.scrollTo(0);

    },
    renderEntryRow(comment){
        return (
            <View>
                <View style={styles.rowWrapp}>
                    <View style={styles.row}>
                      <View  style={styles.leftSection}>
                          <Image source={comment.user.smallAvatarUrl == "placeholder" ? require('image!avatar'):{uri:comment.user.smallAvatarUrl}} style={styles.thumbRound}/>
                          <View style={styles.infoWrap}>
                             <Text style={styles.searchArtistTitle}>{comment.user.username}</Text>
                             <Text style={styles.title}>{comment.comment}</Text>
                         </View>
                         <View><Text style={styles.timeStamp}>{Time.timeDifference(comment.creationTimestamp)}</Text></View>
                      </View>
                    </View>
                </View>
                <Divider style={styles.horDivider}/>
            </View>
        )
    },
    render(){
        return(
            <View style={styles.container}>
                <NavBar backBtn={true} fwdBtn={false} title="COMMENTS" logoType={false} transparentBackground={false}/>
                <View style={styles.wrapper}>
                    <InvertibleScrollView ref="commentsView" inverted
                        scrollEventThrottle={200}
                        automaticallyAdjustContentInsets={false}
                        style={styles.invertedScroll}
                        renderScrollView={
                        (props) => <InvertibleScrollView {...props} inverted  />
                             }>
                        {this.state.comments.map((comment)=> this.renderEntryRow(comment))}
                    </InvertibleScrollView>
                    <View style={styles.commentInputWrap}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Add a comment..."
                        style={styles.commentInput}
                        placeholderTextColor="black"
                        value={this.state.comment}
                        onChangeText={(text) => {
                        this.setState({comment:text});
                        }}
                        />
                        <TouchableOpacity style={styles.commentSend} onPress={this.sendComment} >
                            <Text style={styles.sendComment}>Send</Text>
                        </TouchableOpacity>
                      </View>
                    <View style={{height: this.state.keyboardSpace}}></View>
                </View>
            </View>
        )
    }
});

module.exports = Comments;

