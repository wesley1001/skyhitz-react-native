'use strict';

var React = require('react-native');
var NavBar = require('../navbar/navbar');
var simpleAuthClient = require('react-native-simple-auth');
var LocalStorage = require('../../utils/services/asyncstorage');
var secrets = require('../../utils/secrets/secrets');
var User = require('../../utils/services/user');
var Dimensions = require('Dimensions');
var Loading = require('../loaders/loadingctrl');


var {
    StyleSheet,
    Navigator,
    TouchableHighlight,
    View,
    Text,
    Image
    } = React;

var styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
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
        fontFamily:'Avenir',
        letterSpacing: 16,
        paddingLeft:12
    },
    loginInfo:{
        backgroundColor:'transparent',
        width:275
    },
    info:{
        color:'#FFFFFF',
        textAlign:'center',
        fontSize:16,
        fontFamily:'Avenir',
        paddingTop:10
    },
    signInWrap:{
        alignItems: 'center',
        backgroundColor:'#BB0000',
        borderRadius:5,
        width:275,
        height:50
    },
    loginYoutube:{
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems:'center',
        flex:1
    },
    loginYt:{
        color:'#FFFFFF',
        textAlign:'center',
        fontFamily:'Avenir',
        fontSize:17,
        letterSpacing:2,
        paddingTop:4
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

var ArtistLogin = React.createClass({
    logInWithGoogle(){

        simpleAuthClient.authorize('google-web').then((info) => {

            console.log(info);

            Loading.show();

            info.provider = 'google';

            User.authenticateWithOAuth(info);

        }).catch((error) => {

        });
    },
    componentWillMount() {
        simpleAuthClient.configure(secrets);
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
                    <View style={styles.loginInfo}>
                        <Text style={styles.info}>In order to authenticate Artists, Skyhitz requires a login with the Youtube account connected to your music.</Text>
                    </View>
                    <View style={styles.signInWrap}>
                        <TouchableHighlight style={styles.loginYoutube} onPress={this.logInWithGoogle}>
                            <Text style={styles.loginYt}>LOGIN WITH YOUTUBE</Text>
                        </TouchableHighlight>
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



module.exports = ArtistLogin;
