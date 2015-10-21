'use strict';

var React = require('react-native');
var CustomNav = require('../navbar/customnav');
var HomeFeedDivider = require('../helpers/homefeeddivider');
var Router = require('../../utils/services/router');
var ListsApi = require('../../utils/services/lists');
var Divider = require('../helpers/searchdivider');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var BackBtn = require('../navbar/backbtn');
var FwdBtn = require('../navbar/fwdbtn');


var {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    PixelRatio,
    TextInput,
    ListView,
    Component
    } = React;

var styles = StyleSheet.create({
    navBarRightButton: {
        marginLeft: 10,
        width:11.5,
        height:19.5
    },
    logoType:{
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'nowrap',
        marginTop:7
    },
    playlistIcon:{
        width:10.5,
        height:11.9
    },
    logo:{
        width:30.24,
        height:24.48
    },
    brandName:{
        fontSize:20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily:'Avenir',
        marginLeft:9
    },
    customNav:{
        height:64,
        backgroundColor:'#111111',
        paddingTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    topContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        padding:20,
        flexWrap:'nowrap',
        backgroundColor: '#edf1f2',
        alignItems:'center'
    },
    listPic:{
        width:50,
        height:50,
        borderRadius:25,
        borderWidth:1,
        borderColor:'#1dadff'
    },
    listPicNoBorder:{
        width:50,
        height:50,
        borderRadius:25
    },
    addpic:{
        textAlign:'center',
        fontFamily:'Avenir',
        fontSize:12
    },
    playlistInfo:{
        textAlign:'left',
        fontFamily:'Avenir',
        fontSize:12
    },
    listInfo:{
        paddingLeft:20
    },
    textWrap:{
        marginTop:12,
        width:30,
        alignSelf:'center'
    },
    playlistName:{
        color:'black',
        height:30,
        fontFamily:'Avenir',
        fontSize:12,
        width:200
    },
    textFieldWrap:{
        borderBottomWidth:0.5,
        borderColor:'black',
        marginLeft:90,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    bottomContainer:{
        flex:1,
        backgroundColor: '#edf1f2'
    },
    container:{
        backgroundColor: '#edf1f2',
        flex:1
    },
    redInput:{
        color:'red',
        fontFamily:'Avenir',
        fontSize:12,
        marginRight:10
    },
    blackInput:{
        color:'black',
        fontFamily:'Avenir',
        fontSize:12,
        marginRight:10
    },
    fwdWithOpacity:{
        opacity: 0.5
    }
});

var CreateList = React.createClass({

    getInitialState(){
        return {
           playlistName:'',
           editable:true,
           activeFwd: false,
           avatar:Router.route.avatar
        }
    },

    nameChanged(text){

        return 25 - text.length;

    },
    getNumberStyle(){

        if(!this.state.activeFwd){
            return styles.redInput;
        }else{
            return styles.blackInput;
        }

    },
    goToAddSongs(){
        if(this.state.activeFwd === true){
            Router.goToAddEntriesToList(this.state.playlistName, this.state.avatar);
        }
    },
    renderListAvatar(){
        if(this.state.avatar.hasOwnProperty('small') && this.state.avatar.hasOwnProperty('large')){
            return(
                <TouchableOpacity onPress={()=>Router.goToEditAvatar('list')}>
                    <Image source={{uri:this.state.avatar.small}} style={styles.listPicNoBorder}/>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity onPress={()=>Router.goToEditAvatar('list')}>
                    <View style={styles.listPic}>
                        <View style={styles.textWrap}>
                            <Text style={styles.addpic}>add</Text>
                            <Text style={styles.addpic}>photo</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    },
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.customNav}>
                    <BackBtn navigator={this.props.navigator}/>
                    <View style={styles.logoType}>
                        <Text style={styles.brandName}>NEW PLAYLIST</Text>
                    </View>
                    <FwdBtn onPress={this.goToAddSongs} opacity={!this.state.activeFwd}/>
                </View>
                <View style={styles.container}>

                   <View style={styles.topContainer}>
                       {this.renderListAvatar()}

                        <View style={styles.listInfo}>
                            <Text style={styles.playlistInfo}>Please provide playlist name</Text>
                            <Text style={styles.playlistInfo}>and optional icon</Text>
                        </View>

                   </View>

                    <View style={styles.bottomContainer}>

                        <View style={styles.textFieldWrap}>

                        <TextInput
                            autoCapitalize="none"
                            placeholder="Playlist Name"
                            autoCorrect={false}
                            style={styles.playlistName}
                            placeholderTextColor="black"
                            value={this.state.playlistName}
                            maxLength={25}
                            onChangeText={(text) => {

                              if((text.length > 0) && (text.length < 25)){
                                    this.setState({
                                        activeFwd: true,
                                        playlistName:text
                                    });
                                }else {
                                    this.setState({
                                        activeFwd: false,
                                        playlistName:text
                                    });
                                }

                            }}
                            />

                            <Text style={this.getNumberStyle()}>{this.nameChanged(this.state.playlistName)}</Text>
                          </View>
                    </View>

                </View>
            </View>
        )
    }
});

module.exports = CreateList;