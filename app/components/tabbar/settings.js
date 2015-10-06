'use strict';

var React = require('react-native');

var {
    TouchableHighlight,
    Image,
    StyleSheet,
    Component
    } = React;

var SettingsTab = React.createClass({
    render(){
        return(
            <TouchableHighlight
                onPress={this.props.onPress}
                style={[styles.SettingsTab, {backgroundColor: this.props.selected ? '#131313':'transparent'}]}>
                <Image style={[styles.SettingsTabImg,{opacity:this.props.selected ? 1:0.6}]}
                       source={require('image!settings-tab-icon-white')}></Image>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    SettingsTab: {
        height:50,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    SettingsTabImg: {
        width:30,
        height:30
    }
});

module.exports = SettingsTab;