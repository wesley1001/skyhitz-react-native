'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');

var {
    TouchableOpacity,
    Image,
    StyleSheet,
    Component
    } = React;

var BackBtn = React.createClass({
    getInitialState(){
        return{
            pressFunc: this.props.pressFunc ? this.props.pressFunc : Router.goBack
        }
    },
    render(){
        return(
            <TouchableOpacity
                onPress={this.state.pressFunc}  style={styles.btnWrap}>
                <Image style={styles.navBarLeftButton}
                       source={require('image!backbtn')}></Image>
            </TouchableOpacity>
        );
    }
});

var styles = StyleSheet.create({
    navBarLeftButton: {
        width:11.5,
        height:19.5
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

module.exports = BackBtn;
