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
var Dimensions = require('Dimensions');
var ParallaxView = require('react-native-parallax-view');
var BlurView = require('react-native-blur').BlurView;
var Icon = require('react-native-vector-icons/Ionicons');

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
        backgroundColor: '#edf1f2',
        flex:1,
    },
    parallax: {
        backgroundColor: '#edf1f2',
    },
    topContainer:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "transparent",
        paddingTop: 30
    },
    blur: {
        width:Dimensions.get('window').width,
        bottom:0,
        top:10,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:15,
        paddingBottom:15,
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap:"nowrap",        
    },
    profilepic:{
        borderRadius:80 / PixelRatio.get(),
        width:80,
        height:80,
        marginTop:20,
        marginBottom:10,
        borderColor: 'white',
    },
    name:{
        fontFamily:"Avenir",
        color:'#fff',
        fontSize:16,
        textAlign:'left',
    },
    followers:{
        fontFamily:"Avenir",
        color:'#fff',
        fontSize:12,
        textAlign:'right', 
        top:2       
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
        marginTop:0
    },
    tab:{
        flex:1,
        justifyContent:'center',
        backgroundColor: '#edf1f2',
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
        marginTop:0,
        backgroundColor: '#edf1f2',
        marginBottom:80
    }
});

var Profile = React.createClass({
    getInitialState(){
        return {
            profileUid: this.props.profileUid ? this.props.profileUid : User.userData.uid,
            avatarUrl: User.userData.largeAvatarUrl,
            selectedTab:0,
            username:User.userData.username,
            followersCount:User.userData.followersCount,
            avatar:User.userData.largeAvatarUrl,
            uid: User.getUid(),
            nav: this.props.nav,
            route: this.props.route
        }
    },
    getUserProfile(){

    },
    componentDidMount () {
        this.getUserProfile()
    },
    selectTab(tabIndex){
        this.setState({
            selectedTab: tabIndex
        });
    },
    render(){
        return(
            <View style={styles.container}>
                <ParallaxView
                    backgroundSource={{uri:User.userData.largeAvatarUrl}}
                    windowHeight={200}
                    blur="dark"
                    styles={styles.parallax}
                    header={(
                        <View style={styles.topContainer}>
                            <Image style={styles.profilepic} source={this.state.avatarUrl == "placeholder" ? require('image!avatar'):{uri:this.state.avatarUrl}} />

                            <BlurView blurType="dark" style={styles.blur}>
                                <Text style={styles.name}>
                                    {this.state.username}
                                </Text>
                                <Text style={styles.followers}>
                                    {this.state.followersCount} FOLLOWERS
                                </Text>
                            </BlurView>

                        </View>
                    )}
                >            
                <ScrollView automaticallyAdjustContentInsets={false} contentContainerStyle={styles.contentContainer} style={styles.parallax} contentInset={{bottom: 113}}>
                    <View style={styles.profileTabs}>
                        <TouchableOpacity style={styles.tab} onPress={() => {this.selectTab(0)}}>
                            {this.state.selectedTab === 0 ?
                                <Icon name="ios-list" size={28} color="#51585e" style={styles.listIcon}/>
                                : <Icon name="ios-list-outline" size={28} color="#555" style={styles.listIcon}/>}
                        </TouchableOpacity>
                        <View style={styles.horDivider}></View>
                        <TouchableOpacity style={styles.tab} onPress={() => {this.selectTab(1)}}>
                            {this.state.selectedTab === 1 ?
                                <Icon name="ios-people" size={28} color="#51585e" style={styles.listIcon}/>
                                : <Icon name="ios-people-outline" size={28} color="#555" style={styles.listIcon}/>}
                        </TouchableOpacity>
                        <View style={styles.horDivider}></View>
                        <TouchableOpacity style={styles.tab} onPress={() => {this.selectTab(2)}}>
                            {this.state.selectedTab === 2 ?
                                <Icon name="ios-bell" size={28} color="#51585e" style={styles.listIcon}/>
                                : <Icon name="ios-bell-outline" size={28} color="#555" style={styles.listIcon}/>}
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
                </ParallaxView>
            </View>
        )
    }
});

module.exports = Profile;