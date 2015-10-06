'use strict';

var React = require('react-native');

var {
    View,
    StyleSheet,
    TouchableOpacity
    } = React;

var styles = StyleSheet.create({
    plusWrap: {
        width: 15,
        height: 15,
        marginRight:15,
        marginTop:11
    },
    hor:{
        height: 0.5,
        width:15,
        position:'absolute',
        backgroundColor:'white',
        top:7.25
    },
    ver:{
        height:15,
        width:0.5,
        position:'absolute',
        backgroundColor:'white',
        left:7.25
    }
});

var Plus = React.createClass({

    render(){
        return (
            <TouchableOpacity onPress={this.props.onPress()}>
                <View style={styles.plusWrap}>

                    <View style={styles.hor}></View>
                    <View style={styles.ver}></View>

                </View>
            </TouchableOpacity>
        )
    }
});

module.exports = Plus;
