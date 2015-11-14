'use strict';

var React = require('react-native');
var Router = require('../../../utils/routers/search');
var SearchBar = require('react-native-search-bar');
var YoutubeApi = require('../../../utils/services/youtubeapi');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var CustomTabBar = require('./customtabs');
var Player = require('../../player/player');
var YoutubeRowEntry = require('../../minicomponents/youtube-row-entry');
var YoutubeRowUser = require('../../minicomponents/youtube-row-user');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  StyleSheet,
  View,
  ActivityIndicatorIOS,
  ListView
  } = React;

var styles = StyleSheet.create({
  listview: {
    backgroundColor: '#edf1f2',
    width: windowSize.width
  },
  container: {
    backgroundColor: 'rgba(41, 43, 51, .99)',
    paddingTop: 20,
    flex: 1
  },
  communityTab: {
    backgroundColor: '#edf1f2',
    flex: 1
  },
  searchTabs: {
    flex: 1
  },
  footer: {
    height: 49,
    flex: 1,
    alignSelf: 'center'
  }
});

var Search = React.createClass({
  getInitialState() {
    return {
      entries: [],
      users: [],
      selectedTab: 0,
      lastQuery: '',
      loading: false
    }
  },
  getEntriesDataSource(){
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    return dataSource.cloneWithRows(this.state.entries);
  },
  getUsersDataSource(){
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    return dataSource.cloneWithRows(this.state.users);
  },
  componentDidMount () {
    this.searchEntries('');
  },
  searchEntries(q){
    this.setState({
      loading: true,
      entries: []
    });
    YoutubeApi.searchMusic(q).then((response) => {
      this.setState({
        loading: false,
        entries: response.items
      });
    });
  },
  searchUsers(q){
    this.setState({
      loading: true,
      users: []
    });
    YoutubeApi.searchChannel(q).then((res) => {
      var queryString = '';
      for (var i = 0; i < res.items.length; i++) {
        if (i == 0) {
          queryString = queryString.concat(res.items[i].snippet.channelId)
        } else {
          queryString = queryString.concat(',').concat(res.items[i].snippet.channelId)
        }
      }
      YoutubeApi.getChannels(queryString).then((response) => {
        var users = [];
        for (var i = 0; i < response.items.length; i++) {
          response.items[i].snippet.channelTitle = res.items[i].snippet.channelTitle;
          if (response.items[i].statistics.subscriberCount > 10000) {
            users[response.items[i].id] = response.items[i]
          }
        }
        if (q == '') {
          users = []
        }
        this.setState({
          loading: false,
          users: users
        });
      })
    })
  },
  onChangeText(text){
    this.setState({
      lastQuery: text
    });
    if (this.state.selectedTab == 0) {
      this.searchEntries(text);
    } else {
      this.searchUsers(text);
    }
  },
  tabChanged(i){
    if (i.i === 0) {
      this.searchEntries(this.state.lastQuery);
    } else {
      this.searchUsers(this.state.lastQuery);
    }
    this.setState({
      selectedTab: i.i
    });
  },
  renderEntryRow (entry){
    return (
      <YoutubeRowEntry entry={entry}/>
    )
  },
  renderUserRow (user){
    return (
      <YoutubeRowUser user={user} callback={Router.goToProfile}/>
    )
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
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search"
          hideBackground={true}
          showsCancelButton={false}
          tintColor='#FFFFFF'
          onChangeText={this.onChangeText}
          />
        <ScrollableTabView onChangeTab={this.tabChanged} renderTabBar={() => <CustomTabBar someProp={'here'} />}
                           style={styles.searchTabs}>
          <View tabLabel="SONGS">
            <ListView
              dataSource={this.getEntriesDataSource()}
              renderRow={this.renderEntryRow}
              style={styles.listview}
              automaticallyAdjustContentInsets={false}
              renderFooter={this.renderFooter}
              />
          </View>
          <View tabLabel="INFLUENCERS" style={styles.communityTab}>
            <ListView
              dataSource={this.getUsersDataSource()}
              renderRow={this.renderUserRow}
              style={styles.listview}
              automaticallyAdjustContentInsets={false}
              renderFooter={this.renderFooter}
              />
          </View>
        </ScrollableTabView>
      </View>
    )
  }
});

module.exports = Search;