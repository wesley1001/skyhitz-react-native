'use strict';

var React = require('react-native');
var Divider = require('../../../helpers/followersdivider');
var Follow = require('../../../follow/follow');
var User = require('../../../../utils/services/user');
var Api = require('../../../../utils/services/api');
var Follower = require('../../../minicomponents/follower-row');
var Router = require('../../../../utils/routers/profile');

var {
  StyleSheet,
  View,
  Text,
  ActivityIndicatorIOS,
  ListView
  } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginLeft: 60,
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
  listview: {
    flex: 1
  },
  footer: {
    paddingTop: 10,
    height: 70,
    flex: 1,
    alignSelf: 'center'
  }
});

var Followers = React.createClass({
  getInitialState(){
    return {
      followers: [],
      followingData: [],
      profileUid: this.props.profileUid ? this.props.profileUid : User.getUid(),
      loading:false
    }
  },
  getFollowersDataSource() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    return dataSource.cloneWithRows(this.state.followers);
  },
  componentDidMount () {
    this.getFollowers();
  },
  getFollowers(){
    var page_size = 15;
    var last_key = '';
    if (this.state.followers.length > 0) {
      last_key = this.state.followers[this.state.followers.length - 1].uid;
    }
    var params = '&page_size=' + page_size + '&start_at=' + last_key;
    var url = Api.getFollowers(this.state.profileUid) + params;
    this.setState({
      loading: true
    });
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        if (last_key) {
          data.splice(0, 1)
        }
        this.setState({
          loading: false,
          followers: this.state.followers.concat(data)
        });
      })
  },
  renderFollower(user){
    return (
      <Follower user={user} routerFunc={Router.goToProfile}/>
    )
  },
  onEndReached(){
    this.setState({
      loading: true
    });
    this.getFollowers();
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
        <View style={styles.header}>
          <Text style={styles.headerText}>FOLLOWERS</Text>
        </View>
        <Divider/>
        <ListView
          dataSource={this.getFollowersDataSource()}
          renderRow={this.renderFollower}
          automaticallyAdjustContentInsets={false}
          onEndReached={this.onEndReached}
          style={styles.listview}
          renderFooter={this.renderFooter}
          />
      </View>
    )
  }

});

module.exports = Followers;