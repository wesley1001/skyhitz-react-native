'use strict';

var React = require('react-native');
var FollowService = require('../../utils/services/follow');

var {
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
    View,
    Component
    } = React;

var Follow = React.createClass({
    getInitialState(){
        return{
            follow:this.props.following,
            user: this.props.user
        }
    },
    renderFollow(){
        if(this.state.follow === false){
            return(
                <View style={styles.followWrap}>
                    <View style={styles.plusFollow}>
                        <View style={styles.plusHor}></View>
                        <View style={styles.plusVer}></View>
                    </View>
                    <Text style={styles.followText}>Follow</Text>
                </View>
            )
        }else{
            return(
                <View style={styles.followWrap}>
                    <View style={styles.plusFollow}>
                        <View style={styles.plusHor}></View>
                    </View>
                    <Text style={styles.followText}>Following</Text>
                </View>
            )
        }
    },
    follow(){
        if(this.state.follow === false){
            this.setState({follow:true});
            FollowService.followUser(this.state.user);
        }else{
            this.setState({follow:false});
            FollowService.unfollowUser(this.state.user);
        }
    },
    render(){
        return(
            <View style={styles.followBtn}>
                <TouchableOpacity onPress={this.follow}>
                    {this.renderFollow()}
                </TouchableOpacity>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    navBarLeftButton: {
        marginLeft: 10,
        width:11.5,
        height:19.5
    },
    followWrap:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#1dadff',
        borderWidth:0.5,
        borderRadius:2,
        paddingRight:10,
        paddingLeft:10,
        height:20
    },
    plusFollow:{
        width: 9,
        height:9
    },
    plusHor:{
        width: 8,
        height:0.5,
        backgroundColor:'#1dadff',
        position:'absolute',
        top:3.75
    },
    plusVer:{
        height:8,
        width:0.5,
        backgroundColor:'#1dadff',
        position:'absolute',
        left:3.75
    },
    followingCheckWrap:{
        width:20,
        height:20
    },
    followText:{
        fontFamily:'Avenir',
        fontSize:8,
        color:'#1dadff',
        paddingTop:2,
        paddingLeft:4
    },
    followBtn:{
        marginRight:10
    }
});

module.exports = Follow;