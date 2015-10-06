'use strict';

var React = require('react-native');

var {
    TouchableHighlight,
    Image,
    StyleSheet,
    Component
    } = React;

var SearchTab = React.createClass({
    render(){
        return(
            <TouchableHighlight
                onPress={this.props.onPress}
                style={[styles.searchTab, {backgroundColor: this.props.selected ? '#131313':'transparent'}]}>
                <Image style={[styles.searchTabImg,{opacity:this.props.selected ? 1:0.6}]}
                       source={require('image!search-tab-icon-white')}></Image>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    searchTab: {
        height:50,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    searchTabImg: {
        width: 30,
        height: 30
    }
});

module.exports = SearchTab;