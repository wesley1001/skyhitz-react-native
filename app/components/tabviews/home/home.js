'use strict';

var React = require('react-native');
var NavBar = require('../../navbar/navbar');
var HomeFeedDivider = require('../../helpers/homefeeddivider');
var HomeFeed = require('./homefeed');

var {
    StyleSheet,
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

    render(){

        return(
            <View style={styles.topContainer}>
                <NavBar backBtn={false} fwdBtn={false} logoType={true} transparentBackground={false}/>
                <View style={styles.container}>
                    <HomeFeed style={styles.homeFeed}/>
                </View>
            </View>
        )
    }
});

module.exports = Home;
