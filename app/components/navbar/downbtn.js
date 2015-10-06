'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');
var Player = require('../player/player');

var {
    TouchableOpacity,
    Image,
    StyleSheet,
    Component
    } = React;

var DownBtn = React.createClass({
    render(){
        return(
            <TouchableOpacity
                onPress={Player.hidePlayer} style={styles.btnWrap}>
                <Image style={styles.navBarLeftButton}
                       source={require('image!downbtn')}></Image>
            </TouchableOpacity>
        );
    }
});

var styles = StyleSheet.create({
    navBarLeftButton: {
        marginLeft: 10,
        width:19.5,
        height:11.5
    },
    btnWrap:{
        paddingTop:2,
        paddingBottom:2,
        paddingLeft: 10,
        width:70,
        flexDirection:'row',
        justifyContent:'flex-start'
    }
});

module.exports = DownBtn;