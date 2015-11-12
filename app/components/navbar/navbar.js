'use strict';

var React = require('react-native');
var BackBtn = require('./backbtn');
var SettingsBtn = require('./settingsbtn');
var LogoutBtn = require('./logoutbtn');
var DownBtn = require('./downbtn');
var FwdBtn = require('./fwdbtn');
var LogoType = require('./logotype');
var MenuBtn = require('./menubtn');

var {
  Navigator,
  Text,
  StyleSheet,
  View
} = React;

var styles = StyleSheet.create({
  container:{
      backgroundColor:'rgba(41, 43, 51, 0.99)',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height:44,
      marginTop:20
  },
  transparentContainer:{
      backgroundColor:'transparent',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height:44,
      marginTop:20
  },
  centerBtnWrap:{
      flexDirection:'row',
      justifyContent:'center',
      flexWrap:'nowrap'
  },
  titleText:{
      fontSize:20,
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily:'Avenir',
      marginLeft:9,
      marginTop:6
  },
  emptyBtn:{
      width:70,
      height:23.5
  }
});

var NavBar = React.createClass({
    getInitialState(){
      return {
          downBtn: this.props.downBtn ? this.props.downBtn : null,
          backBtn: this.props.backBtn ? this.props.backBtn : null,
          settingsBtn: this.props.settingsBtn ? this.props.settingsBtn : null,
          logoutBtn: this.props.logoutBtn ? this.props.logoutBtn : null,
          backPressFunc: this.props.backPressFunc ? this.props.backPressFunc : null,
          logoType: this.props.logoType ? this.props.logoType : null,
          fwdBtn: this.props.fwdBtn ? this.props.fwdBtn : null,
          menuBtn: this.props.menuBtn ? this.props.menuBtn : null,
          menuPressFunc: this.props.menuPressFunc ? this.props.menuPressFunc : null,
          title: this.props.title ? this.props.title : null,
          transparentBackground:this.props.transparentBackground ? this.props.transparentBackground : null
      }
    },
    getContainerStyles(){
        if(this.props.transparentBackground == true){
            return styles.transparentContainer;
        }else{
            return styles.container;
        }
    },
    renderLeftBtn(){
      if(this.state.backBtn == true){
        return(
          <BackBtn pressFunc={this.state.backPressFunc}/>
        )
      }else if(this.state.downBtn == true){
        return(
          <DownBtn/>
        )
      }else if(this.state.logoutBtn === true){
        return(
          <LogoutBtn/>
        )
      }else {
          return(
              <View style={styles.emptyBtn}></View>
          )
      }
    },
    renderCenterBtn(){
      if (this.state.title !== null) {
        return(
          <View style={styles.centerBtnWrap}>
            <Text style={styles.titleText}>{this.props.title}</Text>
          </View>
        )
      } else if (this.state.logoType == true) {
        return(
          <View style={styles.centerBtnWrap}>
            <LogoType/>
          </View>
        )
      } else {
        return(
          <View style={styles.centerBtnWrap}>
          </View>
        )
      }
    },
    renderRightBtn(){
      if(this.state.fwdBtn === true){
        return(
          <FwdBtn/>
        )
      }else if(this.state.menuBtn === true){
        return(
          <MenuBtn pressFunc={this.state.menuPressFunc}/>
        )
      }else if(this.state.settingsBtn === true){
        return(
          <SettingsBtn/>
        )
      }else{
        return(
            <View style={styles.emptyBtn}></View>
        )
      }
    },
    render(){
      return(
          <View style={this.getContainerStyles()}>
              {this.renderLeftBtn()}
              {this.renderCenterBtn()}
              {this.renderRightBtn()}
          </View>
      )
    }
});

module.exports = NavBar;
