/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
require('react-native-browser-polyfill');
var React = require('react-native');
var tweenState = require('react-tween-state');
var TimerMixin = require('react-timer-mixin');
// to avoid errors with bluebird require browser polyfill
var Router = require('./app/utils/services/router');
var LoadingOverlay = require('./app/components/loaders/loadingoverlay');
var Loading = require('./app/components/loaders/loadingctrl');
var StartMenu = require('./app/components/authviews/startmenu');
var ArtistLogin = require('./app/components/authviews/artist');
var CommunityLogin = require('./app/components/authviews/community');
var Join = require('./app/components/authviews/join');
var Login = require('./app/components/authviews/login');
var Name = require('./app/components/authviews/name');
var Email = require('./app/components/authviews/email');
var ForgotPass = require('./app/components/authviews/forgotpass');
var ResetPass = require('./app/components/authviews/resetpass');
var MainTabBar = require('./app/components/tabviews/maintabbar');
var Entry = require('./app/components/entryviews/entry');
var Likers = require('./app/components/entryviews/likers');
var Comments = require('./app/components/entryviews/comments');
var AddToPlaylist = require('./app/components/tabviews/lists/addtoplaylist');
var List = require('./app/components/detailviews/list');
var CreateList = require('./app/components/detailviews/createlist');
var AddEntriesToList = require('./app/components/detailviews/addentriestolist');
var CameraRoll = require('./app/components/tabviews/settings/avatar/CameraRoll');
var SquareImageCropper = require('./app/components/tabviews/settings/avatar/SquareImageCropper');


console.log(__DEV__);

var {
    AppRegistry,
    Navigator,
    StatusBarIOS,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    Image,
    Component
} = React;

StatusBarIOS.setStyle('light-content');


var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#111111'
    }
});

var Skyhitz = React.createClass({

    mixins: [tweenState.Mixin, TimerMixin],

    getInitialState(){
        return{
            isVisible:false,
            opacity:1
        }
    },

    renderScene (route, nav) {

        Router.navigator = nav;
        Router.route = route;

        switch (route.id) {
            case 'startmenu':
                return <StartMenu />;
            case 'artist':
                return <ArtistLogin />;
            case 'community':
                return <CommunityLogin />;
            case 'join':
                return <Join />;
            case 'login':
                return <Login />;
            case 'name':
                return <Name/>;
            case 'email':
                return <Email/>;
            case 'forgotpass':
                return <ForgotPass/>;
            case 'resetpass':
                return <ResetPass/>;
            case 'maintabbar':
                return <MainTabBar/>;
            case 'entry':
                return <Entry/>;
            case 'likers':
                return <Likers/>;
            case 'comments':
                return <Comments/>;
            case 'list':
                return <List/>;
            case 'createlist':
                return <CreateList />;
            case 'addtoplaylist':
                return <AddToPlaylist/>;
            case 'addentriestolist':
                return <AddEntriesToList/>;
            case 'editavatar':
                return <CameraRoll/>;
            case 'squareimagecropper':
                return <SquareImageCropper/>;
             default:
                return (
                    <StartMenu />
                );
            }
    },
    componentWillMount(){
        var that = this;
        Loading.show = () => {
                that.setState({
                    isVisible:true
                });
        };
        Loading.hide = () => {
            this.setTimeout(
                () => {
                    that.setState({
                        isVisible:false
                    });
                },
                500
            );
        };
    },

    render () {

        return (

            <View style={styles.container}>

            <Navigator
                initialRoute={{ message: "First Scene" }}
                renderScene={this.renderScene}
                configureScene={(route) => {
                  if (route.sceneConfig) {
                    return route.sceneConfig;
                  }
                  return Navigator.SceneConfigs.FloatFromRight;
                }}
                />
            <LoadingOverlay isVisible={this.state.isVisible} opacity={this.state.opacity}/>

            </View>
        );

    }

});


AppRegistry.registerComponent('Skyhitz', () => Skyhitz)
