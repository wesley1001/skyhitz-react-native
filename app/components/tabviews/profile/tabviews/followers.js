'use strict';

var React = require('react-native');
var Divider = require('../../../helpers/followersdivider');
var Follow = require('../../../follow/follow');
var User = require('../../../../utils/services/user');

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
        width:15,
        height:17,
        marginLeft:30,
        marginRight:25
    },
    header:{
        marginLeft:60,
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
    rowContainer:{
        backgroundColor:'white'
    },
    thumbRound:{
        width:40,
        height:40,
        borderRadius:20,
        marginRight:10
    },
    rowWrapp:{
        flex:1,
        backgroundColor:'white',
        height:50
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight:10,
        alignItems:'center',
        backgroundColor: '#edf1f2',
        height:50
    },
    infoWrap:{
        flex: 1,
        flexDirection: 'row',
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10
    },
    leftSection:{
        flexDirection:'row',
        justifyContent:'flex-start',
        flexWrap:'nowrap',
        alignItems:'center',
        flex:1
    },
    followerSection:{
        flex:1
    },
    followersCount:{
        marginRight:10,
        fontSize:10,
        fontFamily:'Avenir'
    },
    listview:{
        flex:1
    },
    username:{
        fontSize:10,
        fontFamily:'Avenir',
        textAlign:'left',
        paddingLeft:10
    },
    name:{
        fontSize:10,
        fontFamily:'Avenir',
        textAlign:'left',
        paddingLeft:10,
        marginTop:2
    },
});

var Followers = React.createClass({
    getInitialState(){
        return {
            followersData:[],
            followingData:[]
        }
    },
    getFollowersDataSource() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        return dataSource.cloneWithRows(this.state.followersData);
    },
    componentDidMount () {
        this.getFollowing();
    },
    getFollowing(){
        User.getFollowing(User.getUid()).then((followings)=>{
            this.setState({followingData:followings})
            this.getFollowers()
        })
    },
    getFollowers(){
        User.getFollowers(User.getUid()).then((followers)=>{
            this.setState({followersData:followers})
        })
    },
    goToProfile(){
        
    },
    renderFollow(user){
        var followsUser = false;
        if(this.state.followingData[user.uid]){
            followsUser = true;
        }
        return <Follow following={followsUser} user={user}/>
    },
    renderFollower(user){
        return(
            <View>
                <View style={styles.rowWrapp}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={()=>this.goToProfile(user)}>
                            <View style={styles.leftSection}>
                                <Image source={user.smallAvatarUrl == "placeholder" ? require('image!avatar'):{uri:user.smallAvatarUrl}} style={styles.thumbRound}/>
                                <View style={styles.info}>
                                    <Text style={styles.username}>{user.username}</Text>
                                    <Text style={styles.name}>{user.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.rightSection}>
                            {this.renderFollow(user)}
                        </View>
                    </View>
                </View>
                <Divider style={styles.horDivider}/>
            </View>
        )
    },
    onEndReached(){
        // this.getFollowers()
    },
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>FOLLOWERS</Text>
                </View>
                <Divider/>
                <ListView
                    dataSource={this.getFollowersDataSource()}
                    renderRow={this.renderFollower}
                    automaticallyAdjustContentInsets={false}
                    onEndReached={this.onEndReached}
                    style={styles.listview}
                    renderFooter={this.renderFooter}
                    />

            </View>
        )
    }

});

module.exports = Followers;