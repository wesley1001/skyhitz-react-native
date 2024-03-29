'use strict';

var React = require('react-native');
var NavBar = require('../navbar/navbar');
var Router = require('../../utils/services/router');
var CustomNav = require('../navbar/customnav');
var HomeFeedDivider = require('../helpers/homefeeddivider');
var ListsApi = require('../../utils/services/lists');
var Divider = require('../helpers/searchdivider');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var EntryTitle = require('../../utils/entrytitle');
var Player = require('../player/player');
var ThreeDots = require('../helpers/threedots');

var {
    StyleSheet,
    Navigator,
    View,
    Text,
    TouchableOpacity,
    Image,
    PixelRatio,
    ListView,
    Component,
    ActionSheetIOS
    } = React;

var styles = StyleSheet.create({
    navBarRightButton: {
        marginLeft: 10,
        width:11.5,
        height:19.5
    },
    logoType:{
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'nowrap',
        marginTop:7
    },
    playlistIcon:{
        width:10.5,
        height:11.9
    },
    logo:{
        width:30.24,
        height:24.48
    },
    brandName:{
        fontSize:20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily:'Avenir',
        marginLeft:9
    },
    customNav:{
        height:64,
        backgroundColor:'#111111',
        paddingTop:20
    },
    listview:{
        backgroundColor: '#edf1f2',
        width:windowSize.width

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
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'nowrap',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        flex:1
    },
    leftRowSection:{
        flexDirection:'row',
        justifyContent:'flex-start',
        flexWrap:'nowrap',
        alignItems:'center',
        flex:1
    },
    rowWrapp:{
        flex:1,
        backgroundColor:'transparent',
        height:50
    },
    searchArtistTitle:{
        fontSize:12,
        fontFamily:'Avenir',
        textAlign:'left',
        paddingLeft:10
    },
    title:{
        fontSize:12,
        fontFamily:'Avenir',
        fontWeight:'bold',
        textAlign:'left',
        paddingLeft:10,
        marginTop:2
    }
});

var Playlist = React.createClass({
    getInitialState() {
        var listUid = this.props.route == undefined ? Router.listUid : this.props.route.listUid;
        var listName = this.props.route == undefined ? Router.listName : this.props.route.listName;      
        return {
            playlistDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            listUid: listUid,
            listName: listName,
            currentVideoId:Player.currentVideoId
        }
    },
    getPlaylistDataSource: function(data: Array<any>): ListView.DataSource {
        return this.state.playlistDataSource.cloneWithRows(data);
    },
    goBack(){

        this.props.nav._renderedSceneMap._mapData[0][0].message !== "First Scene" ? Router.navigator.jumpBack() : this.componentWillUnmount();

    },
    componentWillUnmount() {

        Router.navigator.pop();

    },
    componentDidMount() {
        this.getEntries();
    },    
    getEntries() {
        var that = this;

        ListsApi.getList(this.state.listUid).then(function(listObj){

            ListsApi.getEntriesInList(listObj.entries).then(function(list){
                console.log(list);
                that.setState({
                    isLoading: false,
                    listName:listObj.name,
                    playlistDataSource: that.getPlaylistDataSource(list)
                });

            }).catch(function(error){
                //console.log(error);
            });

        }).catch(function(error){
            //console.log(error);
        });
    },
    addPoints(item){
        //TODO: Persist added points to firebase ref
        item.points += 1;
        // console.log(item.points);
        // console.log('points added');
    },    
    getCurrentVideoStyle(item){
        if(item.youtubeData.videoId === this.state.currentVideoId){
            return{
                backgroundColor:'#1dadff'
            }
        }
    },
    showActionSheetHotLists(item) {
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
                        this.addPoints(item);
                        break;
                    case 1:
                        Router.addToPlaylist(item);
                        break;
                    case 2:
                        this.showShareActionSheet();
                        break;
                    default :
                        return;
                }
            });
    },
    followList(item){

        ListsApi.followList(item).then(function(response){


        });
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
    renderEntryRow(item){

        return(
            <View>
                <View style={[styles.rowWrapp, this.getCurrentVideoStyle(item) ]}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={()=>Player.playVideo(item.youtubeData.id.videoId, item.youtubeData.snippet.title)}>
                            <View style={styles.leftRowSection}>
                                <Image source={{uri:item.youtubeData.snippet.thumbnails.default.url}} style={styles.thumb}/>
                                <View style={styles.info}>
                                    <Text style={styles.searchArtistTitle}>{EntryTitle.getArtistName(item.youtubeData.snippet.title)}</Text>
                                    <Text style={styles.title}>{EntryTitle.getSongTitle(item.youtubeData.snippet.title)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <ThreeDots onPress={()=>this.showActionSheetHotLists(item)}/>

                    </View>
                </View>
                <Divider style={styles.horDivider}/>
            </View>
        )

    },
    render(){
        return(
            <View>
                <NavBar title={this.state.listName} backBtn={true} backPressFunc={this.goBack} />
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.playlistDataSource}
                        renderRow={this.renderEntryRow}
                        style={styles.listview}
                        automaticallyAdjustContentInsets={false}
                        contentInset={{bottom: 0}}
                        />
                </View>
            </View>
        )
    }
});

module.exports = Playlist;