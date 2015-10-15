'use strict';

var React = require('react-native');
var NavBar = require('../navbar/navbar');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Divider = require('../helpers/whitedivider');
var Name = require('./name');
var Loading = require('../loaders/loadingctrl');
var User = require('../../utils/services/user');
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
    }
});

var Join = React.createClass({

    getInitialState: function() {
        return {
                email: '',
                password: '',
                isLoading:false
        }
    },
    createUser: function(){

        var that = this;

        if(this.state.email == '' && this.state.password == ''){

            AlertIOS.alert(
                null,
                'Please enter all fields.'
            )

        } else if(this.state.email == '' && this.state.password !== ''){

            AlertIOS.alert(
                null,
                'Please enter your email address.'
            )

        } else if(this.state.email !== '' && this.state.password == ''){

            AlertIOS.alert(
                null,
                'Please enter a password.'
            )

        }  else if (this.state.password.length < 8) {

            AlertIOS.alert(
                null,
                "Make sure your password is at least 8 characters long."
            )

        } else if (/\s/.test(this.state.password)){

            AlertIOS.alert(
                null,
                "Make sure your password doesn't contain whitespace."
            )

        } else {

            Loading.show();

            User.createUser(this.state).then(function(user){

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

            <Image style={styles.bg} source={require('image!bgpasswordjoin')}>
                <BlurView blurType="dark" style={styles.blur}>
                    <NavBar backBtn={true} fwdBtn={false} logoType={true} transparentBackground={true}/>

                    <View style={styles.inputContainer}>

                    <TextInput
                        autoCapitalize="none"
                        placeholder="EMAIL"
                        autoCorrect={false}
                        autoFocus={true}
                        style={styles.emailInput}
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
                    <TouchableHighlight style={styles.joinBtn} onPress={this.createUser}>
                        <Text style={styles.joinTextBtn}>JOIN</Text>
                    </TouchableHighlight>

                    </View>
                </BlurView>
            </Image>
        )
    }
});


module.exports = Join;
