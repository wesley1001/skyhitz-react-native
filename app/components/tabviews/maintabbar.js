'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');
var Dimensions = require('Dimensions');
var Home = require('./home/home');
var Search = require('./search/search');
var Lists = require('./lists/lists');
var Profile = require('./profile/main');
var Settings = require('./settings/settings');
var SkyhitzTab = require('../tabbar/skyhitz');
var HomeTab = require('../tabbar/home');
var SearchTab = require('../tabbar/search');
var ProfileTab = require('../tabbar/profile');
var SettingsTab = require('../tabbar/settings');
var Player = require('../player/player');
var Entry = require('../entryviews/entry');
var Subscribable = require('Subscribable');
var TabNavigator = require('react-native-tab-navigator');
var Icon = require('react-native-vector-icons/Ionicons');
var BlurView = require('react-native-blur').BlurView;

var {
    Navigator,
    StyleSheet,
    Animated,
    View,
    Image,
    Text,
    PanResponder,
    TabBarIOS,
    Component
    } = React;

var styles = StyleSheet.create({
    bg: {
      width:Dimensions.get('window').width,
      height:39
    },      
    tabBar:{
        height:68,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        backgroundColor:'transparent',
        alignItems:'flex-end',
        left: 0,
        right:0
    },
    tabIcon: {
        top: 3
    },
    tabBars:{
        height:50,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-end',
        left: 0,
        right:0
    },
    tabs:{
        height:50
    },
    tab:{
        backgroundColor:'transparent'
    },
    appContainer: {
        flex: 1,
        backgroundColor: '#edf1f2'
    },
    searchTab:{
        backgroundColor: '#ffffff'
    },
    modalPlayer:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height + 40,
        backgroundColor:'transparent',
        position:'absolute',
        top:0
    },
    modalPlayerIn:{
        flex:1,
        backgroundColor:'blue'
    },
    tabImg: {
        width:30,
        height:30
    },
    tabImgO: {
        width:30,
        height:30,
        opacity:0.6
    }
});

var MainTabBar = React.createClass({
    mixins: [Subscribable.Mixin],
    getInitialState(){
        return{
            selectedTab : Router.route.selectedTab ? Router.route.selectedTab : 'home',
            isOpen : false,
            isHidden:true,
            opacity: new Animated.Value(0),
            pan: new Animated.ValueXY(),
            tabBarPosition: new Animated.Value(0),
            notificationCount:0
        }
    },
    render(){
        return(
            <View style={styles.appContainer}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <Icon name="android-home" size={28} color="#ccc" style={styles.tabIcon}/>}
                        renderSelectedIcon={() => <Icon name="android-home" size={28} color="#eee" style={styles.tabIcon}/>}
                        badgeText={this.state.notificationCount}
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        <Home/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'search'}
                        renderIcon={() => <Icon name="search" size={28} color="#ccc" style={styles.tabIcon}/>}
                        renderSelectedIcon={() => <Icon name="search" size={28} color="#eee" style={styles.tabIcon}/>}
                        onPress={() => this.setState({ selectedTab: 'search' })}>
                        <Search/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        skyhitzTab={true}
                        selected={this.state.selectedTab === 'lists'}
                        renderIcon={() => <SkyhitzTab onPress={() => this.setState({ selectedTab: 'lists' })}/>}
                        >
                        <Lists/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        renderIcon={() => <Icon name="person" size={28} color="#ccc" style={styles.tabIcon}/>}
                        renderSelectedIcon={() => <Icon name="person" size={28} color="#eee" style={styles.tabIcon}/>}
                        onPress={() => this.setState({ selectedTab: 'profile' })}>
                        <Profile/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'settings'}
                        renderIcon={() => <Icon name="gear-a" size={28} color="#ccc" style={styles.tabIcon}/>}
                        renderSelectedIcon={() => <Icon name="gear-a" size={28} color="#eee" style={styles.tabIcon}/>}
                        onPress={() => this.setState({ selectedTab: 'settings' })}>
                        <Settings/>
                    </TabNavigator.Item>
                </TabNavigator>             
             </View>
        )
    }
});

module.exports = MainTabBar;
