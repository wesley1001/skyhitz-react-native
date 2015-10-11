'use strict';

var React = require('react-native');
var NavBar = require('../../navbar/navbar');
var HomeFeedDivider = require('../../helpers/homefeeddivider');
var HomeFeed = require('./homefeed');
var Router = require('../../../utils/routers/home');

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
        backgroundColor:'#111111'
    },
    container:{
        backgroundColor:'white',
        flex:1
    },
    homeFeed:{
        flex:1,
        backgroundColor:'white'
    }
});

var Home = React.createClass({
    renderScene(route, nav){
        console.log(route)
        Router.navigator = nav;
        Router.route = route;
        if(route.id == 'list'){
            return <List nav={nav} route={route}/>;
        }else {
            return (
                <HomeFeed style={styles.homeFeed}/>
            )
        }
    },
    render(){

        return(
            <View style={styles.topContainer}>
                <NavBar backBtn={false} fwdBtn={false} logoType={true} transparentBackground={false}/>
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

                </View>
            </View>
        )
    }
});

module.exports = Home;
