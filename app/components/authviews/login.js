'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');
var NavBar = require('../navbar/navbar');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Divider = require('../helpers/whitedivider');
var ForgotPass = require('./forgotpass');
var Loading = require('../loaders/loadingctrl');
var User = require('../../utils/services/user');

var {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    AlertIOS,
    TextInput,
    Component
    } = React;

var styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    inputContainer:{
        paddingLeft:40,
        paddingRight:40,
        paddingTop:20
    },
    emailInput: {
        height: 26,
        flex: 1,
        backgroundColor:'transparent',
        color:'#FFFFFF',
        fontFamily:'Avenir',
        fontSize:14,
        paddingBottom:10
    },
    passwordInput:{
        height: 26,
        color:'#FFFFFF',
        flex: 1,
        backgroundColor:'transparent',
        fontFamily:'Avenir',
        fontSize:14,
        paddingTop:10
    },
    joinBtn:{
        height: 48,
        flex: 1,
        backgroundColor: 'rgba(0, 174, 239,0.9)',
        borderRadius:3,
        marginTop:20
    },
    joinTextBtn:{
        textAlign:'center',
        color:'#FFFFFF',
        paddingTop:15,
        letterSpacing:2,
        fontSize:17,
        fontFamily:'Avenir'
    },
    forgotPass:{
        flex: 1,
        backgroundColor:'transparent'
    },
    forgotPassText:{
        textAlign:'center',
        backgroundColor:'transparent',
        color:'#FFFFFF',
        paddingTop:30,
        fontFamily:'Avenir',
        fontSize:16
    }
});

var Login = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            password: ''
        }
    },
    logIn (){

        var that = this;

        if(this.state.email == '' && this.state.password == ''){

            AlertIOS.alert(
                null,
                'Please enter your email and password.'
            )

        } else if(this.state.email == '' && this.state.password !== ''){

            AlertIOS.alert(
                null,
                'Please enter your email address.'
            )

        } else if(this.state.email !== '' && this.state.password == ''){

            AlertIOS.alert(
                null,
                'Please enter your password.'
            )

        } else {

            var userObj = {
                email:this.state.email,
                password:this.state.password
            };

            Loading.show();

            User.authenticateWithPassword(userObj);

        }

    },
    render (){
        return(
            <Image style={styles.bg} source={require('image!bgpasswordlogin')}>

                <NavBar backBtn={true} fwdBtn={false} logoType={true} transparentBackground={true}/>

                <View style={styles.inputContainer}>

                <TextInput
                    autoCapitalize="none"
                    placeholder="EMAIL"
                    autoCorrect={false}
                    style={styles.emailInput}
                    autoFocus={true}
                    placeholderTextColor="white"
                    value={this.state.email}
                    onChangeText={(text) => {
                    this.setState({email:text});
                    }}
                    />
                <Divider />
                <TextInput
                    autoCapitalize="none"
                    placeholder="PASSWORD"
                    autoCorrect={false}
                    style={styles.passwordInput}
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    value={this.state.password}
                    onChangeText={(text) => {
                    this.setState({password:text});
                    }}
                    />
                <TouchableHighlight style={styles.joinBtn} onPress={this.logIn}>
                    <Text style={styles.joinTextBtn}>LOGIN</Text>
                </TouchableHighlight>
                <TouchableOpacity  style={styles.forgotPass} onPress={Router.goToForgotPass} activeOpacity={0.8}>
                    <Text style={styles.forgotPassText}>Forgotten your password?</Text>
                </TouchableOpacity>

                </View>

            </Image>
        )
    }
});


module.exports = Login;
