'use strict';

var React = require('react-native');
var NavBar = require('../navbar/navbar');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Divider = require('../helpers/divider');
var Loading = require('../loaders/loadingctrl');
var User = require('../../utils/services/user');
var Username = require('../../utils/services/username');
var FirebaseRef = require('../../utils/services/firebase-ref');
var LocalStorage = require('../../utils/services/asyncstorage');
var youtubeApi = require('../../utils/services/youtubeapi');
var BlurView = require('react-native-blur').BlurView;

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
    blur: {
        height:Dimensions.get('window').height
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
            username: '',
            name: User.userData.name ? User.userData.name : ''
        }
    },
    updateName: function(){

        var that = this;

        if(this.state.name == ''){
            AlertIOS.alert(
                null,
                'Please enter your name.'
            )
        }else if(this.state.username == ''){
            AlertIOS.alert(
                null,
                'Please pick a username.'
            )
        } else if (/\s/.test(this.state.username)){
            AlertIOS.alert(
                null,
                "Make sure your username doesn't contain whitespace."
            )
        } else {

            Loading.show();

            Username.username = this.state.username;

            FirebaseRef.userName(User.getUid()).set(this.state.name,function(error){
                if(error){
                    Loading.hide();
                    AlertIOS.alert(
                        null,
                        error.message
                    )
                }else {

                    Username.checkIfYoutubeUsernameIsTaken();

                }
            });
        }
    },
    render: function (){
        return(
            <Image style={styles.bg} source={require('image!bgpasswordjoin')}>
                    <BlurView blurType="dark" style={styles.blur}>            
                    <NavBar backBtn={true} fwdBtn={false} logoType={true} transparentBackground={true}/>
                    <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="@USERNAME"
                        autoFocus={true}
                        autoCorrect={false}
                        style={styles.emailInput}
                        placeholderTextColor="white"
                        value={this.state.username}
                        onChangeText={(text) => {
                        this.setState({username:text});
                        }}
                        />
                    <Divider />
                    <TextInput
                        autoCapitalize="none"
                        placeholder="NAME"
                        autoFocus={false}
                        autoCorrect={false}
                        style={styles.passwordInput}
                        placeholderTextColor="white"
                        value={this.state.name}
                        onChangeText={(text) => {
                        this.setState({name:text});
                        }}
                        />
                    <TouchableHighlight style={styles.joinBtn} onPress={this.updateName}>
                        <Text style={styles.joinTextBtn}>GET STARTED</Text>
                    </TouchableHighlight>
                    </View>
                </BlurView>
            </Image>
        )
    }
});


module.exports = Name;
