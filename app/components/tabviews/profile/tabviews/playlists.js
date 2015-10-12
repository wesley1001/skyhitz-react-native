'use strict';

var React = require('react-native');
var Router = require('../../../../utils/services/router');
var Divider = require('../../../helpers/homefeeddivider');
var ListsApi = require('../../../../utils/services/lists');
var Number = require('../../../../utils/number');


var {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    PixelRatio,
    ListView,
    Component
    } = React;

var styles = StyleSheet.create({
    playlistIcon:{
        width:30,
        height:30,
        borderRadius:15,
        marginLeft:10,
        marginRight:10
    },
    playlistIconWrap:{

    },
    header:{
        marginLeft:50,
        paddingTop:10,
        paddingBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headerText:{
        fontFamily:'Avenir',
        fontSize:12
    },
    addNewText:{
        color:'#1dadff',
        fontFamily:'Avenir',
        fontSize:12,
        marginRight:10
    },
    addNew:{
        marginRight:10
    },
    playlistText:{
        fontFamily:"Avenir",
        color:"#626363"
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap:"nowrap",
        height:50,
        alignItems:'center'
    },
    leftSection:{
       flexDirection:"row",
       justifyContent:"flex-start",
       flexWrap:"nowrap",
       alignItems:'center'
    },
    followerSection:{
        flex:1
    },
    followersCount:{
        marginRight:10,
        fontSize:10,
        fontFamily:'Avenir'
    }
});

var Playlists = React.createClass({
    getInitialState(){
        console.log(this);
        return{
            lists:[],
            followingLists:[]
        }
    },
    componentWillMount () {
        this.getUserLists();
    },
    getUserLists(){
        var that = this;
        ListsApi.getUserPlaylists().then(function(lists){
            that.setState({lists:lists});
        });
    },
    goToList(listUid,listName){
        this.props.nav.push({
            id:'list',
            listUid:listUid,
            listName:listName
        });
    },
    renderUserLists(list){
        return(
            <View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.leftSection} onPress={()=>this.goToList(list.listUid, list.name)}>
                    <View style={styles.playlistIconWrap}>
                        <Image source={list.avatar == "" ? require('image!avatar'):{uri:list.avatar.small}} style={styles.playlistIcon}/>
                    </View>
                    <View style={styles.playlistTitle}>
                        <Text style={styles.playlistText}>{list.name}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.followersSection}>
                    <Text style={styles.followersCount}>{Number.getFollowers(list.followersCount)}</Text>
                </TouchableOpacity>
            </View>
            <Divider/>
            </View>
        )
    },
    renderFollowingLists(){
        return(
            <View>
            <View style={styles.row}>
                <View style={styles.leftSection}>
                    <TouchableOpacity style={styles.playlistIconWrap}>
                        <Image source={require('image!playlisticon')} style={styles.playlistIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.playlistTitle}>
                        <Text style={styles.playlistText}>ELECTRO HOUSE</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.followersSection}>
                    <Text style={styles.followersCount}>13 followers</Text>
                </TouchableOpacity>
            </View>
            <Divider/>
            </View>
        )
    },
    renderFollowingListsHeader(){
        if(this.state.followingLists.length > 0){
          return(
              <View>
              <View style={styles.header}>
                  <Text style={styles.headerText}>PLAYLISTS YOU FOLLOW</Text>
              </View>
              <Divider/>
              </View>
          )
        }
    },
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>YOUR PLAYLISTS</Text>
                    <TouchableOpacity style={styles.addNew} onPress={Router.addNewList}>
                        <Text style={styles.addNewText}>ADD NEW</Text>
                    </TouchableOpacity>
                </View>
                <Divider/>
                {this.state.lists.map((list) => this.renderUserLists(list))}
                {this.renderFollowingListsHeader()}
                {this.state.followingLists.map((list)=>this.renderFollowingLists(list))}
            </View>
        )
    }

});

module.exports = Playlists;