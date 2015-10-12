'use strict';

var React = require('react-native');
var NavBar = require('../navbar/navbar');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Divider = require('../helpers/divider');
var Loading = require('../loaders/loadingctrl');
var User = require('../../utils/services/user');

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

var Name = React.createClass({
    getInitialState: function() {
        return {
            email: ''
        }
    },
    updateName: function(){

        var that = this;

        if(this.state.email == ''){

            AlertIOS.alert(
                null,
                'Please enter your E-mail.'
            )
        }else{

            Loading.show();
            User.updateEmail(this.state.email);

        }
    },
    render: function (){
        return(
            <Image style={styles.bg} source={require('image!bgpasswordjoin')}>
                <NavBar backBtn={true} fwdBtn={false} logoType={true} transparentBackground={true}/>
                <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="E-MAIL"
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
                    <TouchableHighlight style={styles.joinBtn} onPress={this.updateName}>
                        <Text style={styles.joinTextBtn}>DONE</Text>
                    </TouchableHighlight>
                </View>
            </Image>
        )
    }
});


module.exports = Name;
