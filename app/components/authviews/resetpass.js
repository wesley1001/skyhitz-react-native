'use strict';

var React = require('react-native');
var NavBar = require('../navbar/navbar');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Divider = require('../helpers/whitedivider');
var Loading = require('../loaders/loadingctrl');
var User = require('../../utils/services/user');
var Router = require('../../utils/services/router');

var {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    TextInput,
    AlertIOS,
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
        fontFamily:'Gotham-Light',
        fontSize:14
    },
    newPasswordInput:{
        height: 26,
        flex: 1,
        backgroundColor:'transparent',
        color:'#FFFFFF',
        fontFamily:'Gotham-Light',
        fontSize:14,
        marginTop:20
    },
    passwordInput:{
        height: 26,
        color:'#FFFFFF',
        flex: 1,
        backgroundColor:'transparent',
        fontFamily:'Gotham-Light',
        fontSize:14,
        marginTop:20
    },
    joinBtn:{
        height: 48,
        flex: 1,
        backgroundColor: 'rgba(0, 174, 239,0.9)',
        borderRadius:3,
        marginTop:30
    },
    joinTextBtn:{
        textAlign:'center',
        color:'#FFFFFF',
        paddingTop:15,
        letterSpacing:2,
        fontSize:17,
        fontFamily:'Gotham-Light'
    },
    forgotPass:{
        flex: 1,
        backgroundColor:'transparent',
        color:'#FFFFFF'
    },
    forgotPassText:{
        textAlign:'center',
        backgroundColor:'transparent',
        color:'#FFFFFF',
        paddingTop:30,
        fontFamily:'Gotham-Light',
        fontSize:16
    }
});

var ResetPass = React.createClass({
    getInitialState: function() {
        return {
            oldPassword: '',
            newPassword:'',
            newPasswordAgain:'',
            email:Router.route.email
        }
    },
    changePassAndLogIn:function(){

        var that = this;

        if(this.state.oldPassword == '') {

            AlertIOS.alert(
                null,
                'Please enter your temporary password.'
            )
        } else if(this.state.newPassword == ''){

            AlertIOS.alert(
                null,
                'Please enter your new password.'
            )

        } else if(this.state.newPasswordAgain == ''){

            AlertIOS.alert(
                null,
                'Please confirm your new password.'
            )

        } else if(this.state.newPassword !== this.state.newPasswordAgain){

            AlertIOS.alert(
                null,
                "Passwords don't match."
            )

        }else{

            Loading.show();

            User.changePassword(this.state).then(function(message){

                AlertIOS.alert(
                    null,
                    'Your password was changed!'
                );

                Router.goToMainTabBar();

                Loading.hide();

            }).catch(function(error){

                AlertIOS.alert(
                    null,
                    error
                );

                Loading.hide();

            });

        }

    },
    render: function () {
        return (
            <Image style={styles.bg} source={require('image!bgpasswordlogin')}>
                <NavBar backBtn={true} fwdBtn={false} logoType={true} transparentBackground={true}/>
                <View style={styles.inputContainer}>
                <TextInput
                    autoCapitalize="none"
                    placeholder="TEMPORARY PASSWORD"
                    autoCorrect={false}
                    autoFocus={true}
                    style={styles.emailInput}
                    placeholderTextColor="white"
                    value={this.state.oldPassword}
                    onChangeText={(text) => {
                    this.setState({oldPassword:text});
                    }}
                    />
                <Divider/>
                <TextInput
                    autoCapitalize="none"
                    placeholder="NEW PASSWORD"
                    autoCorrect={false}
                    style={styles.newPasswordInput}
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    value={this.state.newPassword}
                    onChangeText={(text) => {
                    this.setState({newPassword:text});
                    }}
                    />
                <Divider />
                <TextInput
                    autoCapitalize="none"
                    placeholder="NEW PASSWORD AGAIN"
                    autoCorrect={false}
                    style={styles.passwordInput}
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    value={this.state.newPasswordAgain}
                    onChangeText={(text) => {
                    this.setState({newPasswordAgain:text});
                    }}
                    />
                 <Divider />
                <TouchableHighlight style={styles.joinBtn} onPress={this.changePassAndLogIn}>
                    <Text style={styles.joinTextBtn}>LOGIN</Text>
                </TouchableHighlight>
                <Text style={styles.forgotPassText}>We've sent you an email that includes a temporary password. Use it
                    to change your password.</Text>
                </View>
            </Image>
        )
    }
});

module.exports = ResetPass;
