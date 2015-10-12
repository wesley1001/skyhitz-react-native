'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');
var LocalStorage = require('../../utils/services/asyncstorage');
var User = require('../../utils/services/user');
var Loading = require('../loaders/loadingctrl');

var {
    StyleSheet,
    View,
    Text,
    Image,
    Component,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#111111',
        justifyContent:'space-around',
        alignItems:'center',
        paddingVertical:28
    },
    welcome:{
        alignItems: 'center'
    },
    title:{
        fontSize:34,
        color: 'white',
        textAlign: 'center',
        marginTop:16,
        fontFamily:'Raleway-ExtraLight',
        letterSpacing: 10
    },
    logo:{
        width: 68.1,
        height:51.94
    },
    wrap:{
        alignItems:'center'
    },
    button:{
        width:280,
        height:48,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 4,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center'
    },
    buttonText:{
        flex:1,
        color:'#FFFFFF',
        textAlign:'center',
        fontSize:16,
        letterSpacing:2,
        paddingTop:2,
        fontFamily:'Avenir'
    },
    buttonArtist:{
        borderColor:'#1DADFE',
        width:280,
        height:48,
        borderWidth: 2,
        borderRadius: 4,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center'
    },
    regularText:{
        fontSize:16,
        marginTop:24,
        marginBottom:24,
        color:'#FFFFFF',
        textAlign: 'center',
        fontFamily:'Avenir'
    }
});

var StartMenu = React.createClass({
    getInitialState() {
        return {
            token:null,
            opacity:1
        }
    },

    componentWillMount(){

        this.loadToken();

    },

    loadToken(){

        Loading.show();

        LocalStorage.loadFirebaseToken().then((token)=>{

            this.setState({
                token:token
            });

            if(this.state.token !== null){

                this.authToken();

            }else{

               Loading.hide();

            }

        }).done();

    },

    authToken(){

        User.authenticateWithCustomToken(this.state.token);

    },
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.welcome}>
                    <Image style={styles.logo} source={require('image!logo')}></Image>
                    <Text style={styles.title}>WELCOME</Text>
                </View>
                <View style={styles.wrap}>
                    <Text style={styles.regularText}>Are you a Skyhitz</Text>
                    <TouchableHighlight style={styles.buttonArtist} onPress={Router.goToArtistLogin}>
                        <Text style={styles.buttonText}>ARTIST</Text>
                    </TouchableHighlight>
                    <Text style={styles.regularText}>or new to the</Text>
                    <TouchableHighlight style={styles.button} onPress={Router.goToCommunityLogin}>
                        <Text style={styles.buttonText}>COMMUNITY</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
});



module.exports = StartMenu;
