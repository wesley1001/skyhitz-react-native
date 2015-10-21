'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');

var {
    TouchableOpacity,
    Image,
    StyleSheet,
    Component
    } = React;

var SettingsBtn = React.createClass({
    getInitialState(){
        return{
            selectedTab : Router.route.selectedTab ? Router.route.selectedTab : 'home'
        }
    },    
    getOpacity(){

        if(this.props.opacity){
            return styles.navBarRightButtonOp;
        }else{
            return styles.navBarRightButton;
        }
    },
    render(){
        return(
            <TouchableOpacity
                       style={styles.btnWrap}>
                <Image style={this.getOpacity()}
                       source={require('image!settingsbtn')}></Image>
            </TouchableOpacity>
        );
    }
});

var styles = StyleSheet.create({
    navBarRightButton: {
        width:23.5,
        height:23.5
    },
    navBarRightButtonOp: {
        marginTop:20,
        width:23.5,
        height:23.5,
        opacity:0.5
    },
    btnWrap:{
        marginTop:-39,
        paddingBottom:2,
        paddingRight: 14,
        width:70,
        flexDirection:'row',
        justifyContent:'flex-end'
    }
});

module.exports = SettingsBtn;