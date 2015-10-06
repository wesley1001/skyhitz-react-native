'use strict';

var React = require('react-native');

var {
    View,
    StyleSheet,
    TouchableOpacity
    } = React;

var styles = StyleSheet.create({
    plusWrap: {
        width: 20,
        height: 20,
        borderColor:'#1dadff',
        borderWidth:0.5,
        borderRadius:10,
        marginRight:10
    },
    hor:{
        margin:2.5,
        height: 0.5,
        width:14,
        position:'absolute',
        backgroundColor:'#1dadff',
        top:6.75
    },
    ver:{
        margin:2.5,
        height:14,
        width:0.5,
        position:'absolute',
        backgroundColor:'#1dadff',
        left:6.75
    }
});

var Plus = React.createClass({

    render(){
        return (
            <TouchableOpacity onPress={this.props.onPress}>
            <View style={styles.plusWrap}>

                <View style={styles.hor}></View>
                <View style={styles.ver}></View>

            </View>
            </TouchableOpacity>
        )
    }
});

module.exports = Plus;
