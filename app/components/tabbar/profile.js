'use strict';

var React = require('react-native');

var {
    TouchableHighlight,
    Image,
    StyleSheet,
    Component
    } = React;

var ProfileTab = React.createClass({
    render(){
        return(
            <TouchableHighlight
                onPress={this.props.onPress}
                style={[styles.ProfileTab, {backgroundColor: this.props.selected ? '#131313':'transparent'}]}>
                <Image style={[styles.ProfileTabImg,{opacity:this.props.selected ? 1:0.6}]}
                       source={require('image!profile-tab-icon-white')}></Image>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    ProfileTab: {
        height:50,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    ProfileTabImg: {
        width:30,
        height:30
    }
});

module.exports = ProfileTab;