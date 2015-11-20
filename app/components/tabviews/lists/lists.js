'use strict';

var React = require('react-native');
var MainRouter = require('../../../utils/services/router');
var Router = require('../../../utils/routers/lists');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var CustomTabBar = require('./customtabs');
var Divider = require('../../helpers/searchdivider');
var NavBar = require('../../navbar/navbar');
var ListsApi = require('../../../utils/services/lists');
var EntryApi = require('../../../utils/services/entry');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var ThreeDots = require('../../helpers/threedots');
var EntryTitle = require('../../../utils/entrytitle');
var Number = require('../../../utils/number');
var Player = require('../../player/player');
var Subscribable = require('Subscribable');
var List = require('../../detailviews/list');
var User = require('../../../utils/services/user');
var Api = require('../../../utils/services/api');
var TimerMixin = require('react-timer-mixin');


var {
  StyleSheet,
  Navigator,
  View,
  Text,
  ActionSheetIOS,
  ActivityIndicatorIOS,
  AlertIOS,
  Image,
  TouchableOpacity,
  ListView,
  Component
  } = React;

var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: 'grey'
  },
  container: {
    backgroundColor: '#292b33',
    flex: 1
  },
  listTabsView: {
    backgroundColor: '#edf1f2',
    flex: 1
  },
  listview: {
    backgroundColor: '#edf1f2',
    width: windowSize.width
  },
  thumb: {
    width: 40,
    height: 30
  },
  thumbRound: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'transparent'
  },
  leftRowSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'center',
    flex: 1
  },
  rightRowSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    alignItems: 'center',
    flex: 1
  },
  rightSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  rowWrap: {
    flex: 1,
    height: 50
  },
  searchArtistTitle: {
    fontSize: 12,
    fontFamily: 'Avenir',
    textAlign: 'left',
    paddingLeft: 10,
    marginBottom: 2,
    marginTop: 1,
    color: '#51585e'
  },
  title: {
    fontSize: 12,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10,
    marginTop: 2,
    color: '#51585e'
  },
  points: {
    fontSize: 12,
    fontFamily: 'Avenir',
    color: '#1dadff'
  },
  textListFollowers: {
    fontSize: 8,
    fontFamily: 'Avenir',
    textAlign: 'left',
    color: '#1eaeff'
  },
  songPositionText: {
    fontSize: 12,
    fontFamily: 'Avenir',
    textAlign: 'center'
  },
  songPosition: {
    marginRight: 10
  },
  footer: {
    height: 49,
    flex: 1,
    alignSelf: 'center'
  },
  listCover: {
    width: 30,
    height: 30,
    borderRadius: 15
  }
});

var Lists = React.createClass({
  mixins: [Subscribable.Mixin, TimerMixin],
  getInitialState() {
    return {
      topList: [],
      hotLists: [],
      selectedTab: 0,
      currentVideoId: Player.currentVideoId,
      loading:false
    }
  },
  getTopListDataSource() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    return dataSource.cloneWithRows(this.state.topList);
  },
  getHotListsDataSource() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    return dataSource.cloneWithRows(this.state.hotLists);
  },
  setCurrentVideoId(video){
    console.log(video)
    this.setState({currentVideoId: video.currentVideoId});
  },
  componentDidMount () {
    this.getTopList();
    this.addListenerOn(Player.eventEmitter, 'currentVideoId', this.setCurrentVideoId);
  },
  getTopList(){
    var page_size = 15;
    var last_key = '';
    if (this.state.topList.length > 0) {
      last_key = this.state.topList[this.state.topList.length - 1].relevance;
      last_key = -last_key;
      console.log(last_key)
    }
    var params = '?page_size=' + page_size;

    if(last_key){
      params = params +  '&start_at=' + last_key;
    }

    var url = Api.topList() + params;
    this.setState({
      loading: true
    });
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        if (last_key) {
          data.splice(0, 1)
        }
        this.setState({
          loading: false,
          topList: this.state.topList.concat(data)
        });
      })
  },
  getHotLists(){
    var page_size = 15;
    var last_key = '';
    if (this.state.hotLists.length > 0) {
      last_key = this.state.hotLists[this.state.hotLists.length - 1].relevance;
      last_key = -last_key;
      console.log(last_key)
    }
    var params = '?page_size=' + page_size;

    if(last_key){
      params = params +  '&start_at=' + last_key;
    }

    var url = Api.hotLists() + params;
    this.setState({
      loading: true
    });
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        if (last_key) {
          data.splice(0, 1)
        }
        this.setState({
          loading: false,
          hotLists: this.state.hotLists.concat(data)
        });
      })
  },
  tabChanged(i, ref){
    if (i.i === 1 && this.state.hotLists.length === 0) {
      this.getHotLists();
    }
    this.setState({
      selectedTab: i.i
    });
  },
  getCurrentVideoStyle(item){
    if (item.id == this.state.currentVideoId) {
      return {
        color: 'rgba(29, 173, 255, 1)'
      }
    } else {
      return null
    }
  },
  setList(index){
    Player.currentList = this.state.topList;
    Player.indexInList = index;
  },
  formatPoints(points){
    if (points > 0) {
      return points + ' Pts';
    } else {
      return '';
    }
  },
  onEndReached () {

    console.log('end reached')

    this.setState({
      loading: true
    });
    this.getTopList();
  },
  renderEntryRow(item, secId, itemId){
    return (
      <View>
        <View style={styles.rowWrap}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={()=>{Player.playVideo(item.id, item.title);this.setList(itemId)}}>
              <View style={styles.leftRowSection}>
                <Image source={{uri:item.imageUrl}} style={styles.thumb}/>
                <View style={styles.info}>
                  <Text
                    style={[styles.title,this.getCurrentVideoStyle(item)]}>{EntryTitle.getSongTitle(item.title)}</Text>
                  <Text style={styles.searchArtistTitle}>{EntryTitle.getArtistName(item.title)}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.rightSection}>
              <Text style={styles.points}>{this.formatPoints(item.points)}</Text>
              <ThreeDots onPress={()=>this.showActionSheetTopList(item)}/>
            </View>
          </View>
        </View>
        <Divider style={styles.horDivider}/>
      </View>
    );
  },
  renderListRow(item, secId, rowId){
    return (
      <View>
        <View style={styles.rowWrap}>
          <View style={styles.row}>
            <TouchableOpacity onPress={()=>Router.goToList(item.id, item.name)}>
              <View style={styles.leftRowSection}>
                <Image source={item.avatar == "" ? require('image!avatar'):{uri:item.imageUrl}}
                       style={styles.listCover}/>
                <View style={styles.info}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.searchArtistTitle}>By {item.ownerName}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.rightRowSection}>
              <View style={styles.listFollowers}>
                <Text style={styles.textListFollowers}>{Number.getFollowers(item.followersCount)}</Text>
              </View>
              <ThreeDots onPress={()=>this.showActionSheetHotLists(item)}/>
            </View>
          </View>
        </View>
        <Divider style={styles.horDivider}/>
      </View>
    );
  },
  renderFooter(){
    if (!this.state.loading) {
      return (
        <View style={styles.footer}></View>
      );
    } else {
      return ( <ActivityIndicatorIOS size='small' color="#1eaeff" style={styles.footer}/> );
    }
  },
  render(){
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
              onEndReached={this.onEndReached}
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
  },
  confirmTransaction(points){
    this.setState({
      topList:[],
      loading:true
    });

    EntryApi.addPoints(this.state.selectedEntryUid, points).then(()=>{
      this.setTimeout(
        () => { this.getTopList(); },
        500
      );
    })
  },
  promptResponse(promptValue) {
    if (User.userData.points < promptValue) {
      AlertIOS.alert(
        null,
        "You don't have enough points in your account."
      )
    } else {
      AlertIOS.alert(
        null,
        promptValue + " Points will be added to this song.",
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

        switch (buttonIndex) {
          case 0:
            this.addPoints(item.id);
            break;
          case 1:
            MainRouter.addToPlaylist(item.id);
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

        switch (buttonIndex) {
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
    ListsApi.followList(item).then(function (response) {
    });
  }
});

module.exports = Lists;
