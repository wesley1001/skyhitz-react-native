'use strict';

var React = require('react-native');
var Router = require('../../../../utils/services/router');
var Divider = require('../../../helpers/homefeeddivider');
var ListsApi = require('../../../../utils/services/lists');
var Number = require('../../../../utils/number');
var User = require('../../../../utils/services/user');
var Icon = require('react-native-vector-icons/Ionicons');

var {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    PixelRatio,
    ScrollView,
    Component,
    ActivityIndicatorIOS
    } = React;

var styles = StyleSheet.create({
    playlistIcon:{
        width:30,
        height:30,
        borderRadius:15,
        marginLeft:10,
        marginRight:10
    },
    container:{
        flex:1
    },
    header:{
        marginLeft:50,
        height:50,
        paddingTop:10,
        paddingBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headerText:{
        fontFamily:'Avenir',
        fontSize:12,
        color: '#51585e'
    },
    addNewText:{
        color:'#1dadff',
        fontFamily:'Avenir',
        fontSize:12,
        marginRight:10
    },
    addNew:{
        marginRight:10,
        paddingTop:10,
        paddingBottom:10
    },
    playlistText:{
        fontFamily:"Avenir",
        color:"#51585e"
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
    followersCount:{
        marginRight:10,
        fontSize:12,
        fontFamily:'Avenir',
        color:"#51585e"
    },
    loading:{
        paddingTop:10,
        height:49,
        flex:1,
        alignSelf:'center'
    },
    footer:{
        paddingTop:10,
        height:49,
        flex:1,
        alignSelf:'center'
    }
});

var Playlists = React.createClass({
    getInitialState(){
        console.log(this);
        return{
            lists:[],
            followedLists:[],
            profileUid: this.props.profileUid ? this.props.profileUid : User.getUid()
        }
    },
    componentWillMount () {
        this.getUserLists();
        this.getFollowedLists();
    },
    getUserLists(){
        this.state.isLoading = true;
        ListsApi.getUserLists(this.state.profileUid).then((lists) => {
            this.setState({lists:lists,isLoading:false});
        });
    },
    getFollowedLists(){
        ListsApi.getFollowedLists(this.state.profileUid).then((lists) => {
            this.setState({followedLists:lists});
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
    renderFollowedLists(list){
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
    renderFollowedListsHeader(){
        if(this.state.followedLists.length > 0){
          return(
              <View>
              <View style={styles.header}>
                  <Text style={styles.headerText}>FOLLOWED PLAYLISTS</Text>
              </View>
              <Divider/>
              </View>
          )
        }
    },
    render(){
        return(
            <ScrollView style={styles.container} automaticallyAdjustContentInsets={false}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>PLAYLISTS</Text>
                    <TouchableOpacity style={styles.addNew} onPress={Router.addNewList}>
                        <Text style={styles.addNewText}>
                            ADD NEW
                        </Text>
                    </TouchableOpacity>
                </View>
                <Divider/>
                    {this.state.isLoading ? <ActivityIndicatorIOS style={styles.loading} size='small' color="#1eaeff" /> : 
                    <View>
                        {this.state.lists.map((list) => this.renderUserLists(list))}
                        {this.renderFollowedListsHeader()}
                        {this.state.followedLists.map((list)=>this.renderFollowedLists(list))}
                    </View>
                    }
                <View style={styles.footer}></View>
            </ScrollView>
        )
    }

});

module.exports = Playlists;