'use strict';

var React = require('react-native');
var Divider = require('../../../helpers/homefeeddivider');
var Player = require('../../../player/player');
var YoutubeApi = require('../../../../utils/services/youtubeapi');
var YoutubeRowEntry = require('../../../minicomponents/youtube-row-entry');

var {
  StyleSheet,
  View,
  Text,
  ListView,
  ActivityIndicatorIOS
  } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    backgroundColor: '#edf1f2'
  },
  listview: {
    flex: 1
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
      uid: this.props.uid,
      channelId:this.props.channelId,
      loading: false,
      noMoreData: false,
      pageToken: null
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
      loading: true
    });
    console.log('get entries')

    YoutubeApi.videosInChannel(this.state.channelId, this.state.pageToken).then((data)=>{

      console.log(data.items)

     this.setState({entries:this.state.entries.concat(data.items), loading:false, pageToken: data.nextPageToken})

    })

  },
  renderEntry(entry){
    return(
      <YoutubeRowEntry entry={entry} />
    );
  },
  renderFooter(){
    if (!this.state.loading) {
      return (
        <View style={styles.footer}></View>
      );
    } else {
      return (<ActivityIndicatorIOS size='small' color="#1eaeff" style={styles.footer}/>);
    }
  },
  loadMore() {
    console.log('end reached')
    this.getEntries();
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
          style={styles.listview}
          renderFooter={this.renderFooter}
          onEndReached={this.loadMore}
          onEndReachedThreshold={2}
          />
      </View>
    )
  }
});

module.exports = ArtistList;