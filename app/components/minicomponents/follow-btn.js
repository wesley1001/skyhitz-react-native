'use strict';

var React = require('react-native');
var FollowService = require('../../utils/services/follow');
var Icon = require('react-native-vector-icons/Ionicons');
var User = require('../../utils/services/user');

var {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View
  } = React;

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
  followLargeText:{
    textAlign:'center',
    color:'white',
    paddingTop:5,
    paddingBottom:5
  },
  followBtn:{
    marginRight:10
  },
  followLargeBtn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'white',
    borderWidth:1,
    borderRadius: 4,
    width:150
  },
  listIcon: {
    width: 30,
    height: 30,
    alignSelf: 'center'
  }
});

var Follow = React.createClass({
  getInitialState(){
    console.log(this.props.user)
    return{
      user: this.props.user,
      size: this.props.size,
      following:this.props.user.following
    }
  },
  renderFollow(){
    if(this.state.following === false){
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
    if(this.state.following === false){
      this.setState({following:true});
      FollowService.followUser(this.state.user);
    }else{
      this.setState({following:false});
      FollowService.unfollowUser(this.state.user);
    }
  },
  renderSmall(){
    return (
      <View style={styles.followBtn}>
        <TouchableOpacity onPress={this.follow}>
          {this.renderFollow()}
        </TouchableOpacity>
      </View>
    )
  },
  renderLarge(){
    return (
    <TouchableOpacity style={styles.followLargeBtn} onPress={this.follow}>
      {this.state.following ? <Icon name="minus" size={20} color="white" style={styles.listIcon}/> : <Icon name="plus" size={20} color="white" style={styles.listIcon}/> }
      <Text style={styles.followLargeText}>Follow</Text>
    </TouchableOpacity>
    )
  },
  render(){
    console.log(this.state.user.uid)
    if(this.state.user.uid !== User.getUid()){
      if(this.state.size === 'large'){
        return this.renderLarge();
      }else{
        return this.renderSmall();
      }
    }else{
      return null;
    }
  }
});

module.exports = Follow;