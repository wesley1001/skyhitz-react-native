'use strict';

var React = require('react-native');
// var Swiper = require('react-native-swiper');
var NavBar = require('../../navbar/navbar');
var HomeFeedDivider = require('../../helpers/homefeeddivider');
var Playlists = require('./tabviews/playlists');
var LogoType = require('../../navbar/logotype');
var Badges = require('./tabviews/badges');
var Followers = require('./tabviews/followers');
var Notifications = require('./tabviews/notifications');
var User = require('../../../utils/services/user');
var Router = require('../../../utils/services/router');
var List = require('../../detailviews/list');

var {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Navigator,
    Image,
    PixelRatio,
    Component
    } = React;

var styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
        marginTop:20
    },
    topContainer:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    profilepic:{
        borderRadius:80 / PixelRatio.get(),
        width:80,
        height:80,
        marginTop:10,
        marginBottom:10
    },
    name:{
        fontFamily:"Avenir",
        color:'#1dadff',
        fontSize:16,
        textAlign:'center',
        marginBottom:7
    },
    followers:{
        fontFamily:"Avenir",
        color:'#6e6e6e',
        fontSize:12,
        textAlign:'center'
    },
    profileTabs:{
        borderStyle:'solid',
        borderTopWidth:0.5,
        borderColor:'#dbdbdb',
        borderBottomWidth:0.5,
        height:45,
        flexDirection:"row",
        flexWrap:"nowrap",
        alignItems:"center",
        justifyContent:"space-around",
        marginTop:15
    },
    tab:{
        flex:1,
        justifyContent:'center'
    },
    horDivider:{
        width:0.5,
        backgroundColor:'#dbdbdb',
        height:30
    },
    listIcon:{
        width:31,
        height:20,
        alignSelf:'center'
    },
    followersIcon:{
        width:27.5,
        height:27.5,
        alignSelf:'center'
    },
    notificationsIcon:{
        width:24.5,
        height:27,
        alignSelf:'center'
    },
    contentContainer:{
        marginBottom:80
    }
});

var Profile = React.createClass({
    getInitialState(){
        return {
            selectedTab:0,
            username:User.userData.username,
            followersCount:User.userData.followersCount,
            avatar:User.userData.largeAvatarUrl,
            uid: User.getUid(),
            nav: this.props.nav,
            route: this.props.route
        }
    },
    selectTab(tabIndex){
        this.setState({
            selectedTab: tabIndex
        });
    },
    render(){
        return(
            <View style={styles.container}>
                <ScrollView automaticallyAdjustContentInsets={false} contentContainerStyle={styles.contentContainer}  contentInset={{bottom: 113}}>
                    <View style={styles.topContainer}>
                        <Image style={styles.profilepic} source={User.userData.largeAvatarUrl == "placeholder" ? require('image!avatar'):{uri:User.userData.largeAvatarUrl}} />
                        <Text style={styles.name}>
                            {this.state.username}
                        </Text>
                        <Text style={styles.followers}>
                            {this.state.followersCount} FOLLOWERS
                        </Text>
                    </View>
                    <View style={styles.profileTabs}>
                        <TouchableOpacity style={styles.tab} onPress={() => {this.selectTab(0)}}>
                            {this.state.selectedTab === 0 ?
                                <Image style={styles.listIcon} source={require('image!listbtnblue')}/>
                                : <Image style={styles.listIcon} source={require('image!listbtngrey')}/>}
                        </TouchableOpacity>
                        <View style={styles.horDivider}></View>
                        <TouchableOpacity style={styles.tab} onPress={() => {this.selectTab(1)}}>
                            {this.state.selectedTab === 1 ?
                                <Image style={styles.followersIcon} source={require('image!followersbtnblue')}/>
                                : <Image style={styles.followersIcon} source={require('image!followersbtngrey')}/>}
                        </TouchableOpacity>
                        <View style={styles.horDivider}></View>
                        <TouchableOpacity style={styles.tab} onPress={() => {this.selectTab(2)}}>
                            {this.state.selectedTab === 2 ?
                                <Image style={styles.notificationsIcon} source={require('image!notificationsbtnblue')}/>
                                : <Image style={styles.notificationsIcon} source={require('image!notificationsbtngrey')}/>}
                        </TouchableOpacity>
                    </View>
                    {this.state.selectedTab === 0 ?
                        <Playlists nav={this.state.nav} route={this.state.route}/>
                        :null }
                    {this.state.selectedTab === 1 ?
                        <Followers/>
                        :null }
                    {this.state.selectedTab === 2 ?
                        <Notifications uid={this.state.uid}/>
                        :null }
                </ScrollView>
            </View>
        )
    }
});

module.exports = Profile;