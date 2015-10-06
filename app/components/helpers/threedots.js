'use strict';

var React = require('react-native');

var {
    StyleSheet,
    View,
    TouchableOpacity
    } = React;

var styles = StyleSheet.create({
    dot:{
        width:3,
        height:3,
        borderRadius:1.5,
        backgroundColor:'#1eaeff',
        marginLeft:2
    },
    dots:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:30,
        height:30
    }

});


var DotsMenu = React.createClass({

    render(){

        return(
            <TouchableOpacity onPress={this.props.onPress} style={styles.touchDots}>
                <View style={styles.dots}>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                </View>
            </TouchableOpacity>
        )

    }

});


module.exports = DotsMenu;