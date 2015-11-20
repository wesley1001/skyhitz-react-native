'use strict';

var React = require('react-native');
var EntryTitle = require('../../utils/entrytitle');
var Player = require('../player/player');
var Divider = require('../helpers/searchdivider');

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
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    backgroundColor: '#edf1f2'
  },
  thumb: {
    width: 40,
    height: 30
  },
  title: {
    fontSize:12,
    fontFamily: 'Avenir',
    textAlign: 'left',
    fontWeight: 'bold',
    paddingLeft: 10,
    marginTop: 2,
    color:'#51585e'
  },
  searchArtistTitle: {
    fontSize:12,
    fontFamily: 'Avenir',
    textAlign: 'left',
    paddingLeft: 10,
    marginBottom: 2,
    marginTop: 1,
    color:'#51585e'
  }
});

var YoutubeRowEntry = React.createClass({
  getInitialState() {
    return {
      entry:this.props.entry
    }
  },
  render(){
    return (
      <View>
        <TouchableOpacity onPress={()=> Player.playVideo(this.state.entry.id.videoId, this.state.entry.snippet.title, this.state.entry)} style={styles.rowWrap}>
          <View style={styles.row}>
            <Image source={{uri:this.state.entry.snippet.thumbnails.default.url}} style={styles.thumb}/>
            <View style={styles.info}>
              <Text style={styles.title}>{EntryTitle.getSongTitle(this.state.entry.snippet.title)}</Text>
              <Text style={styles.searchArtistTitle}>{EntryTitle.getArtistName(this.state.entry.snippet.title)}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Divider/>
      </View>
    )
  }
});

module.exports = YoutubeRowEntry;