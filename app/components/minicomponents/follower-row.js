'use strict';

var React = require('react-native');
var EntryTitle = require('../../utils/entrytitle');
var Player = require('../player/player');
var Divider = require('../helpers/searchdivider');
var Follow = require('../follow/follow');

var {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
  } = React;

var styles = StyleSheet.create({
  rowWrap: {
    flex: 1,
    backgroundColor: '#edf1f2',
    height: 50
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight:10,
    alignItems:'center',
    backgroundColor: '#edf1f2',
    height:50
  },
  leftSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'center',
    flex: 1
  },
  thumbRound: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  title: {
    fontSize: 12,
    fontFamily: 'Avenir',
    textAlign: 'left',
    fontWeight: 'bold',
    paddingLeft: 10,
    marginTop: 2,
    color: '#51585e'
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
  username: {
    fontSize: 12,
    fontFamily: 'Avenir',
    textAlign: 'left',
    paddingLeft: 10,
    color: '#51585e'
  },
  name: {
    fontSize: 12,
    fontFamily: 'Avenir',
    textAlign: 'left',
    paddingLeft: 10,
    marginTop: 2,
    color: '#51585e'
  }
});

var FollowerRow = React.createClass({
  getInitialState() {
    return {
      user: this.props.user,
      routerFunc:this.props.routerFunc
    }
  },
  render(){
    return (
      <View>
        <View style={styles.rowWrap}>
          <View style={styles.row}>
            <TouchableOpacity onPress={()=>this.state.routerFunc(this.state.user.uid)}>
              <View style={styles.leftSection}>
                <Image
                  source={this.state.user.smallAvatarUrl == "placeholder" ? require('image!avatar'):{uri:this.state.user.smallAvatarUrl}}
                  style={styles.thumbRound}/>
                <View style={styles.info}>
                  <Text style={styles.username}>{this.state.user.username}</Text>
                  <Text style={styles.name}>{this.state.user.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.rightSection}>
              <Follow following={this.state.user.following} user={this.state.user}/>
            </View>
          </View>
        </View>
        <Divider style={styles.horDivider}/>
      </View>
    )
  }
});

module.exports = FollowerRow;