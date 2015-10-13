'use strict';

var React = require('react-native');
var Divider = require('../../../helpers/homefeeddivider');
var ProfileFeed = require('../../../../utils/services/profilefeed');
var User = require('../../../../utils/services/user');
var Time = require('../../../../utils/time');

var {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    PixelRatio,
    ListView,
    ActivityIndicatorIOS,
    Component
    } = React;

var styles = StyleSheet.create({
    container:{
        flex:1
    },
    rowContainer:{
        backgroundColor: '#edf1f2'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight:10,
        alignItems:'center',
        backgroundColor: '#edf1f2',
        height:50
    },
    profilePic:{
        borderRadius: 15,
        width:30,
        height:30
    },
    infoWrap:{
        flex: 1,
        flexDirection: 'row',
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10
    },
    link:{
        color:'#1eaeff',
        fontFamily:'Avenir',
        fontSize:11
    },
    text: {
        color:'#51585e',
        fontFamily:'Avenir',
        fontSize:11
    },
    logo:{
        width:21,
        height:17,
        marginRight:4,
        top:-3
    },
    timeText:{
        color:'#cfcdcd',
        fontFamily:'Avenir',
        fontSize:11
    },
    playlistIcon:{
        width:15,
        height:17,
        marginLeft:30,
        marginRight:25
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
        marginRight:10
    },
    playlistText:{
        fontFamily:"Avenir",
        color:"#51585e"
    },
    leftSection:{
        flexDirection:"row",
        justifyContent:"flex-start",
        flexWrap:"nowrap"
    },
    followerSection:{
        flex:1
    },
    followersCount:{
        marginRight:10,
        fontSize:12,
        fontFamily:'Avenir'
    },
    footer:{
        paddingTop:10,
        height:49,
        flex:1,
        alignSelf:'center'
    }
});

var Notifications = React.createClass({
    getInitialState(){
      return{
          notificationsData:[],
          uid: this.props.uid,
          loading:false,
          noMoreData:false
      }
    },
    componentDidMount(){
        this.getNotifications()
    },
    getNotificationsDataSource(){
        var dataSource = new ListView.DataSource({
            rowHasChanged:(row1,row2) => row1 !== row2
        });
        return dataSource.cloneWithRows(this.state.notificationsData);
    },
    endOfData(){
        this.setState({
            isLoading: false,
            noMoreData:true
        });
    },
    getNotifications(){
        var that = this;
        if(this.state.noMoreData === false){
            this.setState({
                isLoading: true
            });
            ProfileFeed.getProfileNotifications(this.state.uid).then(function(data){
                if(data === false){
                    that.endOfData();
                }else{
                    that.setState({
                        isLoading: false,
                        notificationsData: data
                    });
                }
            });
        }
    },
    getFollowingYouException(item){
       return item.followingUsername === User.getUsername() ? 'you': item.followingUsername;
    },
    getUsernameYouException(item){
        return item.username === User.getUsername() ? 'you': item.username;
    },
    getOwnerYouException(item){
        return item.ownerName === User.getUsername() ? 'you': item.ownerName;
    },
    renderNotification(item){
        var now = new Date();
        switch(item.notificationType)
        {
            case 0:
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <Image style={styles.profilePic} source={{uri:item.avatarUrl}}/>
                            <View style={styles.infoWrap}>
                                <TouchableOpacity onPress={()=>this.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{item.followerUsername}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> started following </Text>
                                <TouchableOpacity  onPress={()=>this.goToProfile(item.followingUid)}>
                                    <Text style={styles.link}>{this.getFollowingYouException(item)}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <Divider/>
                    </View>
                );
                break;
            case 1:
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <Image source={{uri:item.avatarUrl}} style={styles.profilePic}/>
                            <View style={styles.infoWrap}>
                                <Image style={styles.logo} source={require('image!logo')}></Image>
                                <TouchableOpacity onPress={()=>this.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{this.getUsernameYouException(item)}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> added points to </Text>
                                <TouchableOpacity onPress={()=>this.goToEntry(item.entryUid)}>
                                    <Text style={styles.link}>a song</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <Divider/>
                    </View>
                );
                break;
            case 2:
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <Image style={styles.profilePic} source={{uri:item.avatarUrl}}/>
                            <View style={styles.infoWrap}>
                                <TouchableOpacity onPress={()=>this.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{this.getUsernameYouException(item)}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> released </Text>
                                <TouchableOpacity onPress={()=>this.goToEntry(item.entryUid)}>
                                    <Text style={styles.link}> a new song</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <Divider/>
                    </View>
                );
                break;
            case 3:
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <Image style={styles.profilePic} source={{uri:item.avatarUrl}}/>
                            <View style={styles.infoWrap}>
                                <TouchableOpacity onPress={()=>this.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{this.getUsernameYouException(item)}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> followed</Text>
                                <TouchableOpacity onPress={()=>this.goToList(item.listUid)}>
                                    <Text style={styles.link}> a playlist </Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>by </Text>
                                <TouchableOpacity onPress={()=>this.goToProfile(item.listAdminUid)}>
                                    <Text style={styles.link}>{item.listAdminUsername}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <Divider/>
                    </View>
                );
                break;
            case 4:
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <Image style={styles.profilePic} source={{uri:item.avatarUrl}}/>
                            <View style={styles.infoWrap}>
                                <TouchableOpacity onPress={()=>this.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{this.getOwnerYouException(item)}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> created a new</Text>
                                <TouchableOpacity onPress={()=>this.goToList(item.listUid)}>
                                    <Text style={styles.link}> playlist</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <Divider/>
                    </View>
                );
                break;
            default:
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <Image style={styles.profilePic} source={{uri:item.avatarUrl}}/>
                            <View style={styles.infoWrap}>
                                <TouchableOpacity onPress={()=>this.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{this.getUsernameYouException(item)}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> added</Text>
                                <TouchableOpacity onPress={()=>this.goToEntry(item.entryUid)}>
                                    <Text style={styles.link}> a song</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> to</Text>
                                <TouchableOpacity onPress={()=>this.goToList(item.listUid)}>
                                    <Text style={styles.link}> a playlist</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <Divider/>
                    </View>
                );
        }
    },
    renderFooter(){
        if(!this.state.isLoading){
            return(
                <View style={styles.footer}></View>
            );
        }else{
            return( <ActivityIndicatorIOS hidden='true' size='large' color="#1eaeff" style={styles.footer} /> );
        }
    },
    onEndReached () {

        this.setState({
            isLoading: true
        });
        this.getNotifications();
    },
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>NOTIFICATIONS</Text>
                </View>
                <Divider/>
                <ListView
                    dataSource={this.getNotificationsDataSource()}
                    renderRow={this.renderNotification}
                    automaticallyAdjustContentInsets={false}
                    onEndReached={this.onEndReached}
                    style={styles.listview}
                    renderFooter={this.renderFooter}
                    />
            </View>
        )
    }
});

module.exports = Notifications;