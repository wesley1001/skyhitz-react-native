'use strict';

var React = require('react-native');
var NavBar = require('../../navbar/navbar');
var HomeFeedDivider = require('../../helpers/homefeeddivider');
var Playlists = require('./tabviews/playlists');
var ArtistList = require('./tabviews/artist-list');
var LoadingOverlay = require('../../loaders/loadingoverlay');
var LogoType = require('../../navbar/logotype');
var Badges = require('./tabviews/badges');
var Followers = require('./tabviews/followers');
var Notifications = require('./tabviews/notifications');
var User = require('../../../utils/services/user');
var Users = require('../../../utils/services/users');
var Router = require('../../../utils/services/router');
var List = require('../../detailviews/list');
var Dimensions = require('Dimensions');
var BlurView = require('react-native-blur').BlurView;
var Icon = require('react-native-vector-icons/Ionicons');
var Loading = require('../../../components/loaders/loadingctrl');
var TimerMixin = require('react-timer-mixin');

var {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Navigator,
  Image,
  PixelRatio,
  Component,
  ActivityIndicatorIOS
  } = React;

var styles = StyleSheet.create({
  container: {
    backgroundColor:'rgba(41, 43, 51, 1)',
    flex: 1
  },
  parallax: {
    backgroundColor: '#edf1f2',
    height: 175
  },
  topContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  parallaxWrap: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  blur: {
    width: Dimensions.get('window').width,
    bottom: 0,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  profilepic: {
    borderRadius: 80 / PixelRatio.get(),
    width: 80,
    height: 80,
    marginBottom: 20,
    marginTop: -40,
    borderWidth: 1,
    borderColor: 'white',
  },
  name: {
    fontFamily: "Avenir",
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
  },
  followers: {
    fontFamily: "Avenir",
    color: '#fff',
    fontSize: 16,
    textAlign: 'right',
  },
  profileTabs: {
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderColor: '#dbdbdb',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    height: 55,
    padding: 5,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 0
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  horDivider: {
    width: 0.5,
    backgroundColor: '#dbdbdb',
    height: 30
  },
  listIcon: {
    width: 30,
    height: 30,
    alignSelf: 'center'
  },
  followersIcon: {
    width: 27.5,
    height: 27.5,
    alignSelf: 'center'
  },
  notificationsIcon: {
    width: 24.5,
    height: 27,
    alignSelf: 'center'
  },
  contentContainer: {
    marginTop: 0,
    backgroundColor: '#edf1f2',
    marginBottom: 80
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  banner:{
    flex: 1
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center'
  }
});

var Profile = React.createClass({
  mixins: [TimerMixin],
  getInitialState(){
    return {
      profileUid: this.props.route.profileUid ? this.props.route.profileUid : '',
      avatarUrl: this.props.route.profileUid ? 'placeholder' : User.userData.largeAvatarUrl,
      selectedTab: 0,
      username: User.userData.username,
      followersCount: User.userData.followersCount,
      bannerUrl:null,
      userType:3,
      uid: User.getUid(),
      nav: this.props.nav,
      route: this.props.route,
      opacity:1,
      isVisible:true
    }
  },
  getUserProfile(){
    if (this.state.profileUid) {
      Users.getUserData(this.state.profileUid).then((user)=> {
        console.log(user)
            this.setState({
              avatarUrl: user.largeAvatarUrl,
              username: user.username,
              followersCount: user.followersCount,
              uid: user.uid,
              userType:user.userType,
              bannerUrl:user.bannerUrl ? user.bannerUrl : null
            });
        this.setTimeout(
          () => {
            this.setState({
              isVisible:false,
              opacity:0
            });
          },
          500
        );
      })
    } else {
      this.setState({
        userType:1,
        isVisible:false,
        opacity:0
      });
    }
  },
  componentWillMount(){
    // Loading.show()
  },
  componentDidMount () {
    this.getUserProfile()
  },
  selectTab(tabIndex){
    this.setState({
      selectedTab: tabIndex
    });
  },
  getFollowersCount(){
    if(this.state.followersCount == 0){
      return ''
    }
    if(this.state.followersCount == 1){
      return '1 Follower'
    }
    if(this.state.followerCount > 1){
      return this.state.followersCount + ' Followers'
    }
  },
  renderCommunityProfile(){
    return (
      <View style={styles.container}>
        <View style={styles.parallaxWrap}>
          <Image source={{uri:this.state.avatarUrl}} style={styles.menu}>
            <BlurView blurType="dark" style={styles.menu}>
              <NavBar backBtn={this.state.route.backBtn ? true: false} backPressFunc={this.state.nav.jumpBack} fwdBtn={false} logoType={false}
                      transparentBackground={true}/>
              <View style={styles.topContainer}>
                <Image style={styles.profilepic}
                       source={this.state.avatarUrl == "placeholder" ? require('image!avatar'):{uri:this.state.avatarUrl}}/>
                <BlurView blurType="dark" style={styles.blur}>
                  <Text style={styles.name}>
                    {this.state.username}
                  </Text>
                  <Text style={styles.followers}>
                    {this.getFollowersCount()}
                  </Text>
                </BlurView>
              </View>
            </BlurView>
          </Image>
        </View>
        <View style={styles.profileTabs}>
          <TouchableOpacity style={styles.tab} onPress={() => {this.selectTab(0)}}>
            {this.state.selectedTab === 0 ?
              <Icon name="android-list" size={30} color="#51585e" style={styles.listIcon}/>
              : <Icon name="android-list" size={30} color="#555" style={styles.listIcon}/>}
          </TouchableOpacity>
          <View style={styles.horDivider}></View>
          <TouchableOpacity style={styles.tab} onPress={() => {this.selectTab(1)}}>
            {this.state.selectedTab === 1 ?
              <Icon name="person-stalker" size={30} color="#51585e" style={styles.listIcon}/>
              : <Icon name="person-stalker" size={30} color="#555" style={styles.listIcon}/>}
          </TouchableOpacity>
          <View style={styles.horDivider}></View>
          <TouchableOpacity style={styles.tab} onPress={() => {this.selectTab(2)}}>
            {this.state.selectedTab === 2 ?
              <Icon name="android-notifications" size={30} color="#51585e" style={styles.listIcon}/>
              : <Icon name="android-notifications" size={30} color="#555" style={styles.listIcon}/>}
          </TouchableOpacity>
        </View>
        <ScrollView automaticallyAdjustContentInsets={false} contentContainerStyle={styles.contentContainer}
                    style={styles.parallax}>
          {this.state.selectedTab === 0 ?
            <Playlists nav={this.state.nav} route={this.state.route} profileUid={this.state.profileUid}/>
            : null }
          {this.state.selectedTab === 1 ?
            <Followers profileUid={this.state.profileUid}/>
            : null }
          {this.state.selectedTab === 2 ?
            <Notifications uid={this.state.uid} profileUid={this.state.profileUid}/>
            : null }
        </ScrollView>
        <LoadingOverlay isVisible={this.state.isVisible} opacity={this.state.opacity}/>
      </View>
    )
  },
  renderArtistProfile(){
    return (
      <View style={styles.container}>
        <View style={styles.parallaxWrap}>
          <Image source={{uri:this.state.bannerUrl}} style={styles.banner} >
            <View style={styles.overlay}>
              <NavBar backBtn={this.state.route.backBtn ? true: false} backPressFunc={this.state.nav.jumpBack} fwdBtn={false} logoType={false}
                      transparentBackground={true}/>
              <View style={styles.topContainer}>
                <Image style={styles.profilepic}
                       source={this.state.avatarUrl == "placeholder" ? require('image!avatar'):{uri:this.state.avatarUrl}}/>
                <BlurView blurType="dark" style={styles.blur}>
                  <Text style={styles.name}>
                    {this.state.username}
                  </Text>
                  <Text style={styles.followers}>
                    {this.getFollowersCount()}
                  </Text>
                </BlurView>
                </View>
              </View>
          </Image>
        </View>
        <View style={styles.profileTabs}>
          <TouchableOpacity style={styles.tab} onPress={() => {this.selectTab(0)}}>
            {this.state.selectedTab === 0 ?
              <Icon name="ios-musical-notes" size={30} color="#51585e" style={styles.listIcon}/>
              : <Icon name="ios-musical-notes" size={30} color="#555" style={styles.listIcon}/>}
          </TouchableOpacity>
          <View style={styles.horDivider}></View>
          <TouchableOpacity style={styles.tab} onPress={() => {this.selectTab(1)}}>
            {this.state.selectedTab === 1 ?
              <Icon name="person-stalker" size={30} color="#51585e" style={styles.listIcon}/>
              : <Icon name="person-stalker" size={30} color="#555" style={styles.listIcon}/>}
          </TouchableOpacity>
        </View>
        <ScrollView automaticallyAdjustContentInsets={false} contentContainerStyle={styles.contentContainer}
                    style={styles.parallax}>
          {this.state.selectedTab === 0 ?
            <ArtistList nav={this.state.nav} route={this.state.route} profileUid={this.state.profileUid}/>
            : null }
          {this.state.selectedTab === 1 ?
            <Followers profileUid={this.state.profileUid}/>
            : null }
        </ScrollView>
        <LoadingOverlay isVisible={this.state.isVisible} opacity={this.state.opacity}/>
      </View>
    )
  },
  render(){
    if(this.state.userType == 1){
      return this.renderCommunityProfile()
    }else {
      return this.renderArtistProfile()
    }
  }
});

module.exports = Profile;