'use strict';

var React = require('react-native');
var Divider = require('../../../helpers/homefeeddivider');
var ProfileFeed = require('../../../../utils/services/profilefeed');
var User = require('../../../../utils/services/user');
var Time = require('../../../../utils/time');
var Router = require('../../../../utils/routers/profile');
var Api = require('../../../../utils/services/api');
var Player = require('../../../player/player');
var EntryTitle = require('../../../../utils/entrytitle');
var YoutubeApi = require('../../../../utils/services/youtubeapi');

var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  PixelRatio,
  ListView,
  ActivityIndicatorIOS,
  Component
  } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    backgroundColor: '#edf1f2'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    backgroundColor: '#edf1f2',
    height: 50
  },
  profilePic: {
    borderRadius: 15,
    width: 30,
    height: 30
  },
  infoWrap: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  link: {
    color: '#1eaeff',
    fontFamily: 'Avenir',
    fontSize: 11
  },
  text: {
    color: '#51585e',
    fontFamily: 'Avenir',
    fontSize: 11
  },
  logo: {
    width: 21,
    height: 17,
    marginRight: 4,
    top: -3
  },
  timeText: {
    color: '#cfcdcd',
    fontFamily: 'Avenir',
    fontSize: 11
  },
  playlistIcon: {
    width: 15,
    height: 17,
    marginLeft: 30,
    marginRight: 25
  },
  header: {
    marginLeft: 50,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontFamily: 'Avenir',
    fontSize: 12,
    color: '#51585e'
  },
  addNewText: {
    color: '#1dadff',
    fontFamily: 'Avenir',
    fontSize: 12,
    marginRight: 10
  },
  addNew: {
    marginRight: 10
  },
  playlistText: {
    fontFamily: "Avenir",
    color: "#51585e"
  },
  leftSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "nowrap"
  },
  followerSection: {
    flex: 1
  },
  followersCount: {
    marginRight: 10,
    fontSize: 12,
    fontFamily: 'Avenir'
  },
  footer: {
    paddingTop: 10,
    height: 70,
    flex: 1,
    alignSelf: 'center'
  }
});

var ArtistList = React.createClass({
  getInitialState(){
    return {
      entries: [],
      uid: this.props.uid ? this.props.uid : User.getUid(),
      channelId:this.props.channelId,
      loading: false,
      noMoreData: false
    }
  },
  componentDidMount(){
    console.log(this.props.channelId)
    this.getEntries()
  },
  getEntriesDataSource(){
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    return dataSource.cloneWithRows(this.state.entries);
  },
  getEntries(){

    this.setState({
      isLoading: true
    });

    YoutubeApi.videosInChannel(this.state.channelId).then((data)=>{

      console.log(data.items)

     this.setState({entries:data.items, isLoading:false})

    })

  },
  renderEntry(item){
    return(
      <View>
        <View  style={styles.rowWrap}>
          <View style={styles.row}>
            <TouchableOpacity onPress={()=>{Player.playVideo(item.id.videoId, item.snippet.title)}}>
              <View style={styles.leftRowSection}>
                <Image source={{uri:item.snippet.thumbnails.default.url}} style={styles.thumb}/>
                <View style={styles.info}>
                  <Text style={styles.title}>{EntryTitle.getSongTitle(item.snippet.title)}</Text>
                  <Text style={styles.searchArtistTitle}>{EntryTitle.getArtistName(item.snippet.title)}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.rightSection}>

            </View>
          </View>
        </View>
        <Divider style={styles.horDivider}/>
      </View>
    );
  },
  renderFooter(){
    if (!this.state.isLoading) {
      return (
        <View style={styles.footer}></View>
      );
    } else {
      return ( <ActivityIndicatorIOS size='small' color="#1eaeff" style={styles.footer}/> );
    }
  },
  onEndReached () {
    this.setState({
      isLoading: true
    });
    this.getNotifications();
  },
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>TRACKS</Text>
        </View>
        <Divider/>
        <ListView
          dataSource={this.getEntriesDataSource()}
          renderRow={this.renderEntry}
          automaticallyAdjustContentInsets={false}
          onEndReached={this.onEndReached}
          style={styles.listview}
          renderFooter={this.renderFooter}
          />
      </View>
    )
  }
});

module.exports = ArtistList;