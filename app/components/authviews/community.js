'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');
var NavBar = require('../navbar/navbar');
var FacebookLoginManager = require('NativeModules').FacebookLoginManager;
var User = require('../../utils/services/user');
var Dimensions = require('Dimensions');
var Loading = require('../loaders/loadingctrl');


var {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    Component
    } = React;

var styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    contentWrap:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        flex:1
    },
    brand:{
        alignItems: 'center',
        backgroundColor:'transparent',
        paddingBottom:60
    },
    logo:{
        width: 69,
        height:53,
        marginTop:8
    },
    title:{
        fontSize:34,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop:20,
        fontFamily:'Raleway-ExtraLight',
        letterSpacing: 16,
        paddingLeft:12
    },
    signInWrap:{
        backgroundColor:'transparent',
        paddingTop:120,
        width:275
    },
    signInButton:{
        width:118.5,
        height:40
    },
    loginFacebook:{
        backgroundColor:'#44619D',
        height:50,
        borderRadius:5,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    loginFb:{
        color:'#FFFFFF',
        textAlign:'center',
        fontSize:17,
        letterSpacing:2,
        paddingTop:2,
        fontFamily:'Avenir'
    },
    joinContainer:{
        paddingTop:10,
        paddingBottom:10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    joinBtn:{
        flex: 2,
        backgroundColor:'#00aeef',
        alignSelf: 'stretch',
        justifyContent: 'center',
        opacity: 0.8,
        borderRadius:3,
        height:50,
        marginRight:5
    },
    loginBtn:{
        backgroundColor:'#ffffff',
        opacity: 0.8,
        borderRadius:3,
        height:50,
        flex: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginLeft:5
    },
    joinText:{
        color:'#FFFFFF',
        textAlign:'center',
        letterSpacing:2,
        fontSize:17,
        fontFamily:'Avenir',
        paddingTop:2
    },
    loginText:{
        color:'#000000',
        textAlign:'center',
        letterSpacing:2,
        fontSize:17,
        fontFamily:'Avenir',
        paddingTop:2
    },
    footer:{
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'transparent',
        paddingBottom:25
    },
    footerText:{
        color:'#FFFFFF',
        textAlign:'center',
        fontSize:16,
        alignSelf:'center',
        justifyContent: 'center',
        fontFamily:'Avenir'
    },
    link:{
        fontWeight:'bold',
        fontFamily:'Avenir'
    }
});

var CommunityLogin = React.createClass({

    loginWithFacebook(){

      FacebookLoginManager.newSession((error, info) => {

                if (error) {

                } else {

                    Loading.show();

                    info.provider = 'facebook';
                   User.authenticateWithOAuth(info);

                }
            });

    },
    render(){
        return(
            <Image style={styles.bg} source={require('image!bglogin')}>

                <NavBar backBtn={true} fwdBtn={false} logoType={false} transparentBackground={true}/>

                <View style={styles.contentWrap}>

                <View style={styles.brand}>
                    <Image style={styles.logo} source={require('image!logo')}></Image>
                    <Text style={styles.title}>SKYHITZ</Text>
                </View>
                <View style={styles.signInWrap}>
                   <TouchableHighlight style={styles.loginFacebook} onPress={this.loginWithFacebook}>
                       <Text style={styles.loginFb}>LOGIN WITH FACEBOOK</Text>
                   </TouchableHighlight>
                    <View style={styles.joinContainer}>
                        <TouchableHighlight style={styles.joinBtn} onPress={Router.goToJoin}><Text style={styles.joinText}>JOIN</Text></TouchableHighlight>
                        <TouchableHighlight style={styles.loginBtn} onPress={Router.goToLogin}><Text style={styles.loginText}>LOGIN</Text></TouchableHighlight>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>By using Skyhitz, you agree to the </Text>
                    <Text style={styles.footerText}><Text style={styles.link}>Terms of Use</Text> and <Text style={styles.link}>Privacy Policy.</Text></Text>
                </View>
                </View>
            </Image>
        )
    }
});



module.exports = CommunityLogin;
