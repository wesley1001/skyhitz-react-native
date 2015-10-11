'use strict';

var React = require('react-native');
var Router = require('../../../utils/routers/lists');
var Loading = require('../../animations/loading');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var CustomTabBar = require('./customtabs');
var Divider = require('../../helpers/searchdivider');
var NavBar = require('../../navbar/navbar');
var ListsApi = require('../../../utils/services/lists');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var ThreeDots = require('../../helpers/threedots');
var EntryTitle = require('../../../utils/entrytitle');
var Number = require('../../../utils/number');
var Player = require('../../player/player');
var Subscribable = require('Subscribable');
var List = require('../../detailviews/list');

var {
    StyleSheet,
    Navigator,
    View,
    Text,
    ActionSheetIOS,
    Image,
    TouchableOpacity,
    ListView,
    Component
    } = React;

var styles = StyleSheet.create({
    description:{
        fontSize:20,
        textAlign:'center',
        color:'grey'
    },
    container:{
        backgroundColor:'#111111',
        flex:1
    },
    listTabsView:{
        backgroundColor:'white',
        flex:1
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
        backgroundColor:'transparent'
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
        height:50
    },
    searchArtistTitle:{
        fontSize:10,
        fontFamily:'Gotham-Book',
        textAlign:'left',
        paddingLeft:10,
        marginBottom:2,
        marginTop:1
    },
    title:{
        fontSize:10,
        fontFamily:'Gotham-Light',
        textAlign:'left',
        paddingLeft:10,
        marginTop:2
    },
    textListFollowers:{
        fontSize:8,
        fontFamily:'Gotham-Light',
        textAlign:'left',
        color:'#1eaeff'
    },
    songPositionText:{
        fontSize:10,
        fontFamily:'Gotham-Light',
        textAlign:'center'
    },
    songPosition:{
        marginRight:10
    },
    footer:{
        height:49,
        flex:1,
        alignSelf:'center'
    },
    listCover:{
        width:30,
        height:30,
        borderRadius:15
    }
});

var Lists = React.createClass({
    mixins: [Subscribable.Mixin],
    getInitialState() {
        return {
            topListData:[],
            hotListsData:[],
            selectedTab:0,
            currentVideoId:Player.currentVideoId
        }
    },
    getTopListDataSource() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        return dataSource.cloneWithRows(this.state.topListData);
    },
    getHotListsDataSource() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        return dataSource.cloneWithRows(this.state.hotListsData);
    },
    setCurrentVideoId(video){
        console.log(video)
        this.setState({currentVideoId:video.currentVideoId});
    },
    componentDidMount () {
        this.getTopList();
        this.addListenerOn(Player.eventEmitter, 'currentVideoId', this.setCurrentVideoId);
    },
    getTopList(){
        var that = this;
        ListsApi.getTopList().then(function(list){
            that.setState({
                isLoading: false,
                topListData: Object.keys(list).map((k) => { return list[k] })
            });
        }).catch(function(error){

        });
    },
    getHotLists(){
        var that = this;
        ListsApi.getHotLists().then(function(lists){
            that.setState({
                isLoading: false,
                hotListsData: lists
            });
        }).catch(function(error){
        });
    },
    tabChanged(i, ref){
        if(i.i === 1 && this.state.hotListsData.length === 0){
            this.getHotLists();
        }
        this.setState({
            selectedTab: i.i
        });
    },
    getCurrentVideoStyle(item){
        if(item.youtubeData.videoId == this.state.currentVideoId){
            return {
                color:'rgba(29, 173, 255, 1)'
            }
        }else{
            return null
        }
    },
    setList(index){
        Player.currentList = this.state.topListData;
        Player.indexInList = index;
    },
    renderEntryRow(item, secId, itemId){
        return(
            <View>
                <View  style={styles.rowWrapp}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={()=>{Player.playVideo(item.youtubeData.id.videoId, item.youtubeData.snippet.title);this.setList(itemId)}}>
                            <View style={styles.leftRowSection}>
                                <Image source={{uri:item.youtubeData.snippet.thumbnails.default.url}} style={styles.thumb}/>
                                <View style={styles.info}>
                                    <Text style={[styles.searchArtistTitle,{color:(item.youtubeData.videoId == this.state.currentVideoId) ? 'rgba(29, 173, 255, 1)':'rgba(0, 0, 0, 1)'}]}>{EntryTitle.getArtistName(item.youtubeData.snippet.title)}</Text>
                                    <Text style={[styles.title,this.getCurrentVideoStyle(item)]}>{EntryTitle.getSongTitle(item.youtubeData.snippet.title)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <ThreeDots onPress={()=>this.showActionSheetTopList(item)}/>
                    </View>
                </View>
                <Divider style={styles.horDivider}/>
            </View>
        );
    },
    renderListRow(item, secId, rowId){
        return(
            <View>
                <View  style={styles.rowWrapp}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={()=>Router.goToList(item.listUid, item.name)}>
                            <View style={styles.leftRowSection}>
                                <Image source={item.avatar == "" ? require('image!avatar'):{uri:item.avatar.small}} style={styles.listCover}/>
                                <View style={styles.info}>
                                    <Text style={styles.searchArtistTitle}>{item.name}</Text>
                                    <Text style={styles.title}>By {item.ownerName}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.listFollowers}>
                            <Text style={styles.textListFollowers}>{Number.getFollowers(item.followersCount)}</Text>
                        </View>
                        <ThreeDots onPress={()=>this.showActionSheetHotLists(item)}/>
                    </View>
                </View>
                <Divider style={styles.horDivider}/>
            </View>
        );
    },
    renderFooter(){
        return(<View style={styles.footer}></View>);
    },
    renderScene(route, nav){
        console.log(route)
        Router.navigator = nav;
        Router.route = route;
        if(route.id == 'list'){
            return <List nav={nav} route={route}/>;
        }else {
            return (
                <View style={styles.container}>
                    <NavBar backBtn={false} fwdBtn={false} logoType={true} transparentBackground={false}/>
                    <ScrollableTabView onChangeTab={this.tabChanged} renderTabBar={() => <CustomTabBar/>}
                                       style={styles.listTabsView}>
                        <View tabLabel="Top List">
                            <ListView
                                dataSource={this.getTopListDataSource()}
                                renderRow={this.renderEntryRow}
                                style={styles.listview}
                                automaticallyAdjustContentInsets={false}
                                contentInset={{bottom: 0}}
                                renderFooter={this.renderFooter}
                                />
                        </View>
                        <View tabLabel="Hot Playlists">
                            <ListView
                                dataSource={this.getHotListsDataSource()}
                                renderRow={this.renderListRow}
                                style={styles.listview}
                                automaticallyAdjustContentInsets={false}
                                contentInset={{bottom: 0}}
                                renderFooter={this.renderFooter}
                                />
                        </View>
                    </ScrollableTabView>
                </View>
            )
        }
    },
    render(){
        return(
            <View style={styles.container}>
                <Navigator
                    initialRoute={{ message: "First Scene" }}
                    renderScene={this.renderScene}
                    configureScene={(route) => {
                         if (route.sceneConfig) {
                             return route.sceneConfig;
                         }
                         return Navigator.SceneConfigs.FloatFromRight;
                         }}
                    />
            </View>
        )
    },
    addPoints(item){
        //TODO: Persist added points to firebase ref
        item.points += 1;
        // console.log(item.points);
        // console.log('points added');
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
    showActionSheetTopList(item) {
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
    showActionSheetHotLists(item) {
        var BUTTONS = [
            'Follow Playlist',
            'Share Playlist...',
            'Cancel'
        ];
        var DESTRUCTIVE_INDEX = 2;
        var CANCEL_INDEX = 4;

        ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                //  cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX
            },
            (buttonIndex) => {

                switch (buttonIndex){
                    case 0:
                        this.followList(item);
                        break;
                    case 1:
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
    }
});

module.exports = Lists;

// TO DO

/*

 add song position to row
 <View style={styles.songPosition}>

 <Text style={styles.songPositionText}>1</Text>

 </View>

 */
