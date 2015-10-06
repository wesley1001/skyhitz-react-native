'use strict';

var React = require('react-native');

var {
    TouchableOpacity,
    Image,
    StyleSheet,
    Component
    } = React;

var FwdBtn = React.createClass({
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
                onPress={this.props.onPress} style={styles.btnWrap}>
                <Image style={this.getOpacity()}
                       source={require('image!fwdbtn')}></Image>
            </TouchableOpacity>
        );
    }
});

var styles = StyleSheet.create({
    navBarRightButton: {
        width:11.5,
        height:19.5
    },
    navBarRightButtonOp: {
        width:11.5,
        height:19.5,
        opacity:0.5
    },
    btnWrap:{
        paddingTop:2,
        paddingBottom:2,
        paddingRight: 10,
        width:70,
        flexDirection:'row',
        justifyContent:'flex-end'
    }
});

module.exports = FwdBtn;