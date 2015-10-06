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

var {
    StyleSheet,
    Navigator,
    View,
    Text,
    TouchableOpacity,
    Image,
    PixelRatio,
    ListView,
    Component
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
        fontFamily:'Gotham-Light',
        marginLeft:9
    },
    customNav:{
        height:64,
        backgroundColor:'#111111',
        paddingTop:20
    },
    listview:{
        backgroundColor:'white',
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
        fontSize:10,
        fontFamily:'Gotham-Bold',
        textAlign:'left',
        paddingLeft:10
    },
    title:{
        fontSize:10,
        fontFamily:'Gotham-Light',
        textAlign:'left',
        paddingLeft:10,
        marginTop:2
    }
});

var Playlist = React.createClass({
    getInitialState() {
        return {
            playlistDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            listUid:this.props.route.listUid,
            listName:this.props.route.listName,
            currentVideoId:Player.currentVideoId
        }
    },
    getPlaylistDataSource: function(data: Array<any>): ListView.DataSource {
        return this.state.playlistDataSource.cloneWithRows(data);
    },
    componentDidMount () {

        this.getEntries();

    },
    goBack(){

        this.props.nav.jumpBack();

    },
    getEntries(){

        var that = this;

        ListsApi.getList(this.state.listUid).then(function(listObj){

            ListsApi.getEntriesInList(listObj.entries).then(function(list){

                that.setState({
                    isLoading: false,
                    listName:listObj.name,
                    playlistDataSource: that.getPlaylistDataSource(list)
                });

            }).catch(function(error){

            });

        }).catch(function(error){

        });

    },
    getCurrentVideoStyle(item){
        if(item.youtubeData.videoId === this.state.currentVideoId){
            return{
                backgroundColor:'#1dadff'
            }
        }
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