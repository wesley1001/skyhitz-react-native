'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');
var ListsApi = require('../../utils/services/lists');
var youtubeApi = require('../../utils/services/youtubeapi');
var User = require('../../utils/services/user');
var Divider = require('../helpers/searchdivider');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var BackBtn = require('../navbar/backbtn');
var FwdBtn = require('../navbar/fwdbtn');
var Plus = require('../helpers/plus');
var Minus = require('../helpers/minus');
var entryApi = require('../../utils/services/entry');
var EntryTitle = require('../../utils/entrytitle');
var Icon = require('react-native-vector-icons/Ionicons');
var Loader = require('../../components/loaders/loadingctrl');
var Artist = require('../../utils/services/artist');

var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ListView
  } = React;

var styles = StyleSheet.create({
  logoType: {
    width: windowSize / 3
  },
  logo: {
    width: 30.24,
    height: 24.48
  },
  brandName: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Avenir',
    marginLeft: 0
  },
  create: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    marginRight: 10
  },
  customNav: {
    height: 64,
    backgroundColor: '#111111',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  playlistName: {
    color: 'black',
    height: 30,
    fontFamily: 'Avenir',
    fontSize: 12,
    width: 200
  },
  textFieldWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchFieldWrap: {
    borderBottomWidth: 0.5,
    borderColor: 'black',
    marginLeft: 20,
    flex: 1,
    marginTop: 20
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#edf1f2'
  },
  container: {
    backgroundColor: '#edf1f2',
    flex: 1
  },
  redInput: {
    color: 'red',
    fontFamily: 'Avenir',
    fontSize: 12,
    marginRight: 10
  },
  blackInput: {
    color: 'black',
    fontFamily: 'Avenir',
    fontSize: 12,
    marginRight: 10
  },
  listview: {
    backgroundColor: '#edf1f2',
    width: windowSize.width
  },
  thumb: {
    width: 40,
    height: 30
  },
  searchIcon: {
    left: 10,
    top: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#edf1f2'
  },
  leftRowSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'center',
    flex: 1
  },
  rowWrap: {
    flex: 1,
    backgroundColor: '#edf1f2',
    height: 50
  },
  searchArtistTitle: {
    fontSize: 12,
    fontFamily: 'Avenir',
    textAlign: 'left',
    paddingLeft: 10,
    marginBottom: 2,
    marginTop: 1

  },
  title: {
    fontSize: 12,
    fontFamily: 'Avenir',
    textAlign: 'left',
    paddingLeft: 10,
    marginTop: 2
  },
  communityTab: {
    backgroundColor: '#edf1f2'
  }
});

var CreateList = React.createClass({
  getInitialState(){
    return {
      lastQuery: '',
      editable: true,
      activeFwd: false,
      entries: [],
      search:[],
      addMode: false
    }
  },
  getEntriesDataSource(){
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    return dataSource.cloneWithRows(this.state.entries);
  },
  getSearchDataSource(){
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    return dataSource.cloneWithRows(this.state.search);
  },
  searchSongs(q){
    this.setState({addMode:true});
    youtubeApi.searchMusic(q).then((response) => {
      console.log(response)
      this.setState({
        search: response.items
      });
    });
  },
  onChangeText(text){
    this.setState({
      lastQuery: text
    });
    this.searchSongs(text);
  },
  selectEntry(entry){
    this.setState({addMode:false})

    this.textInput.setNativeProps({text: ''});

    var arr = [];
    arr.push(entry);

    this.setState({
      entries: this.state.entries.concat(arr)
    });

    this.indexEntry(entry);
  },
  deleteEntry(entry, ref, index){
    var newArr = this.state.entries;
    newArr.splice(index, 1);
    this.setState({entries: newArr})
  },
  indexEntry(entry){
    Artist.indexArtist(entry);
    entryApi.indexEntry(entry);
  },
  createList(){
    Loader.show();
    var list = {
      uid: User.getUid(),
      name: Router.route.listName,
      ownerName: User.userData.username,
      entries: [],
      avatar: Router.route.avatar ? Router.route.avatar : ''
    };
    for (var i = 0; i < this.state.entries.length; i++) {
      if (this.state.entries[i]) {
        list.entries[this.state.entries[i].id.videoId] = true;
      }
    }
    ListsApi.createList(list).then(function (listUid) {
      Loader.hide();
      Router.goToMainTabBar('profile');
    });
  },
  nameChanged(text){
    return 25 - text.length;
  },
  getNumberStyle(){
    if (!this.state.activeFwd) {
      return styles.redInput;
    } else {
      return styles.blackInput;
    }
  },
  goToAddSongs(){
    if (this.state.activeFwd === true) {
      this.props.navigator.push({
        id: 'addentriestolist'
      });
    }
  },
  renderSongRow (item, ref, index){
    if (this.state.addMode == true) {
      return (
        <View>
          <View style={styles.rowWrap}>
            <View style={styles.row}>
              <View style={styles.leftRowSection}>
                <Image source={{uri:item.snippet.thumbnails.default.url}} style={styles.thumb}/>
                <View style={styles.info}>
                  <Text style={styles.searchArtistTitle}>{EntryTitle.getArtistName(item.snippet.title)}</Text>
                  <Text style={styles.title}>{EntryTitle.getSongTitle(item.snippet.title)}</Text>
                </View>
              </View>
              <Plus onPress={()=>this.selectEntry(item)}/>
            </View>
          </View>
          <Divider style={styles.horDivider}/>
        </View>
      )
    } else {
      return (
        <View>
          <View style={styles.rowWrap}>
            <View style={styles.row}>
              <View style={styles.leftRowSection}>
                <Image source={{uri:item.snippet.thumbnails.default.url}} style={styles.thumb}/>
                <View style={styles.info}>
                  <Text style={styles.searchArtistTitle}>{EntryTitle.getArtistName(item.snippet.title)}</Text>
                  <Text style={styles.title}>{EntryTitle.getSongTitle(item.snippet.title)}</Text>
                </View>
              </View>
              <Minus onPress={()=>this.deleteEntry(item, ref, index)}/>
            </View>
          </View>
          <Divider style={styles.horDivider}/>
        </View>
      )
    }
  },
  getCurrentList(){
    if(this.state.addMode == false){
      return(
        <ListView
          dataSource={this.getEntriesDataSource()}
          renderRow={this.renderSongRow}
          style={styles.listview}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={true}
          pagingEnabled={true}
          contentInset={{bottom: 0}}
          />
      )
    } else {
      return(
        <ListView
          dataSource={this.getSearchDataSource()}
          renderRow={this.renderSongRow}
          style={styles.listview}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={true}
          pagingEnabled={true}
          contentInset={{bottom: 0}}
          />
      )
    }
  },
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.customNav}>
          <BackBtn navigator={this.props.navigator}/>
          <View style={styles.logoType}>
            <Text style={styles.brandName}>{Router.route.listName.substring(0, 10)}</Text>
          </View>
          <TouchableOpacity
            onPress={this.createList}>
            <Text style={styles.create}>Create</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.bottomContainer}>
            <View style={styles.textFieldWrap}>
              <Icon name="search" size={34} color="#51585e" style={styles.searchIcon}/>
              <View style={styles.searchFieldWrap}>
                <TextInput
                  ref={component => this.textInput = component}
                  autoCapitalize="none"
                  placeholder="Search for Songs"
                  autoCorrect={false}
                  style={styles.playlistName}
                  placeholderTextColor="black"
                  value={this.state.lastQuery}
                  onChangeText={this.onChangeText}
                  />
              </View>
            </View>
            {this.getCurrentList()}
          </View>
        </View>
      </View>
    )
  }
});

module.exports = CreateList;