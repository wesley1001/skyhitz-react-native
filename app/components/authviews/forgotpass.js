'use strict';

var React = require('react-native');
var NavBar = require('../navbar/navbar');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Divider = require('../helpers/whitedivider');
var Loading = require('../loaders/loadingctrl');
var User = require('../../utils/services/user');
var Router = require('../../utils/services/router');
var BlurView = require('react-native-blur').BlurView;

var {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    AlertIOS,
    TextInput,
    Component
    } = React;

var styles = StyleSheet.create({
    blur: {
        height:Dimensions.get('window').height
    },        
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
        backgroundColor:'transparent',
        color:'#FFFFFF'
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

var ForgotPass = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            isLoading:false
        }
    },
    goToResetPass: function(){
        this.props.navigator.push({
            id:'resetpass',
            passProps: {
                email: this.state.email
            }
        })
    },
    sendResetEmail:function(){

        var that = this;

        if(this.state.email == ''){

            AlertIOS.alert(
                null,
                'Please enter your email address.'
            )

        }else{

            Loading.show();

            User.resetPassword(this.state).then(function(message){

                AlertIOS.alert(
                    null,
                    message
                );

                Router.goToResetPass(that.state.email);

                Loading.hide();

            }).catch(function(error){

               Loading.hide();

                AlertIOS.alert(
                    null,
                    error
                );

            });

        }

    },
    render: function(){
        return(
            <Image style={styles.bg} source={require('image!bgpasswordlogin')}>
                <BlurView blurType="dark" style={styles.blur}>            
                    <NavBar backBtn={true} fwdBtn={false} logoType={true} transparentBackground={true}/>
                    <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="EMAIL"
                        autoFocus={true}
                        autoCorrect={false}
                        style={styles.emailInput}
                        placeholderTextColor="white"
                        value={this.state.email}
                        onChangeText={(text) => {
                        this.setState({email:text});
                        }}
                        />
                    <Divider />
                    <TouchableHighlight style={styles.joinBtn} onPress={this.sendResetEmail}>
                        <Text style={styles.joinTextBtn}>Send Reset Email</Text>
                    </TouchableHighlight>
                        <Text style={styles.forgotPassText}>We'll send you an email to reset your password.</Text>
                    </View>
                </BlurView>
            </Image>
        )
    }
});

module.exports = ForgotPass;
