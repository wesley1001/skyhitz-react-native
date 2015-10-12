'use strict';

var React = require('react-native');

var {
    TouchableHighlight,
    Image,
    StyleSheet,
    Component
    } = React;

var HomeTab = React.createClass({
    render(){
        return(
            <TouchableHighlight
                onPress={this.props.onPress}
                style={[styles.homeTab, {backgroundColor: 'this.props.selected' ? '#131313':'transparent'}]}>
                <Image style={[styles.homeTabImg,{opacity:this.props.selected ? 1:0.6}]}
                       source={require('image!home-tab-icon-white')}></Image>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    homeTab: {
        height:50,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    homeTabImg: {
        width:30,
        height:30
    }
});

module.exports = HomeTab;