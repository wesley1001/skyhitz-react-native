'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');
var User = require('../../utils/services/user');
var Icon = require('react-native-vector-icons/Ionicons');

var {
    TouchableOpacity,
    Image,
    StyleSheet,
    Component
    } = React;

var LogoutBtn = React.createClass({
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
    logout(){
        console.log('loggingout');
        User.logOut();
        Router.goToStartMenu();
    },    
    render(){
        return(
            <TouchableOpacity
                       style={styles.btnWrap}
                       onPress={() => {this.logout()}}>
                    <Icon name="android-exit" size={30} color="#fff" />                
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
        paddingBottom:2,
        paddingLeft: 14,
        width:70,
        flexDirection:'row',
        justifyContent:'flex-start'
    }
});

module.exports = LogoutBtn;