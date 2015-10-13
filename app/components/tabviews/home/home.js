'use strict';

var React = require('react-native');
var HomeFeedDivider = require('../../helpers/homefeeddivider');
var HomeFeed = require('./homefeed');
var Router = require('../../../utils/routers/home');
var Profile = require('../profile/profile');
var List = require('../../detailviews/list');

var {
    StyleSheet,
    Navigator,
    View,
    Text,
    Image
    } = React;

var styles = StyleSheet.create({
    topContainer:{
        flex:1,
        backgroundColor:'#292b33'
    },
    container:{
        backgroundColor: '#edf1f2',
        flex:1
    },
    homeFeed:{
        flex:1,
        backgroundColor: '#edf1f2'
    }
});

var Home = React.createClass({
    renderScene(route, nav){
        console.log(route)
        Router.navigator = nav;
        Router.route = route;
        switch (route.id) {
            case 'list':
                return <List nav={nav} route={route}/>;
            case 'profile':
                return <Profile nav={nav} route={route}/>;
            default:
                return (
                    <HomeFeed />
                );
        }
    },
    render(){

        return(
            <View style={styles.topContainer}>
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
            </View>
        )
    }
});

module.exports = Home;
