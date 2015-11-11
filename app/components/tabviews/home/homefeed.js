
'use strict';

var React = require('react-native');
var HomeFeedDivider = require('../../helpers/homefeeddivider');
var Api = require('../../../utils/services/api');
var User = require('../../../utils/services/user');
var Time = require('../../../utils/time');
var Slider = require('./slider');
var Router = require('../../../utils/routers/home');
var Player = require('../../player/player');
var NavBar = require('../../navbar/navbar');


var {
    View,
    Navigator,
    TouchableOpacity,
    ListView,
    ActivityIndicatorIOS,
    Image,
    Text,
    StyleSheet
    } = React;

var styles = StyleSheet.create({
    container:{
        backgroundColor: '#edf1f2',
        flex:1
    },
    bgContainer:{
        backgroundColor: 'rgba(41, 43, 51, 1)',
        flex:1
    },
    rowContainer:{
        backgroundColor: '#edf1f2'
    },
    streamline:{
        height:36,
        paddingLeft:50,
        backgroundColor: '#edf1f2'
    },
    streamText:{
        color:'#51585e',
        fontFamily:'Avenir',
        fontSize:18,
        justifyContent:'center',
        paddingTop:14
    },
    separator:{
        backgroundColor:'#dbdbdb',
        flex:1,
        marginLeft:50
    },
    separatorWrap:{
        height:0.5
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
    listview:{
      flex:1
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
    timeText:{
        color:'#cfcdcd',
        fontFamily:'Avenir',
        fontSize:11
    },
    profilePic:{
       borderRadius: 15,
       width:30,
       height:30
    },
    logo:{
        width:21,
        height:17,
        marginRight:4,
        top:-3
    },
    footer:{
        paddingTop:10,
        height:49,
        flex:1,
        alignSelf:'center'
    }
});

var Header = React.createClass({
    render(){
          return (
            <View style={styles.rowContainer}>
                <View style={styles.streamline}>
                    <Text style={styles.streamText}>STREAM</Text>
                </View>
                <View style={styles.separatorWrap}>
                    <View style={styles.separator}></View>
                </View>
            </View>
          )
    }
});

var HomeFeed = React.createClass({
    getInitialState () {
        return {
            isLoading: false,
            currentPage:0,
            notifications:[],
            noMoreData:false,
            headerSections:[{slider:true},{header:true}]
        };
    },
    getNotificationsDataSource() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        return dataSource.cloneWithRows(this.state.notifications);
    },
    componentDidMount () {
        this.getUserNotifications();
    },
    getUserNotifications(){
        var page_size = 15;
        var last_key = '';
        if(this.state.notifications.length > 0){
            last_key = this.state.notifications[this.state.notifications.length - 1].notificationUid;
            console.log(last_key)
        }
        var params = '?page_size='+page_size+'&start_at='+last_key;
        var url = Api.homeFeedUrl(User.getUid()) + params;
        this.setState({
            isLoading: true
        });
            fetch(url)
              .then((data) => data.json())
              .then((data) => {
                  console.log(data);

                  if(!last_key){
                      data.unshift({header:true});
                      data.unshift({slider:true});
                  }else{
                      var item = data.splice(0,1)
                  }

                  this.setState({
                      isLoading: false,
                      notifications:this.state.notifications.concat(data)
                  });

              })
              .catch((error) => {
                  console.warn(error);
              });
    },
    goToProfile (uid){
      //  console.log('going to profile page ' + uid);
    },
    goToEntry (entryUid){
        this.props.navigator.push({
            id:'entry',
            entryUid:entryUid,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        })
    },
    goToList (listUid){
        this.props.navigator.push({
            id:'playlist',
            listUid:listUid
        })
    },
    renderRow (item, sec, rowId) {
            if(rowId == 0){
                return <Slider/>;
            } else if(rowId == 1){
                return <Header/>;
            } else {
                return this.renderNotifications(item);
            }
    },
    renderNotifications(item){
        var now = new Date();
        switch(item.notificationType)
        {
            case 0:
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <Image style={styles.profilePic} source={{uri:item.avatarUrl}}/>
                            <View style={styles.infoWrap}>
                                <TouchableOpacity onPress={()=>Router.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{item.followerUsername}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> started following </Text>
                                <TouchableOpacity  onPress={()=>Router.goToProfile(item.followingUid)}>
                                    <Text style={styles.link}>{item.followingUsername}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <HomeFeedDivider/>
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
                                <TouchableOpacity onPress={()=>Router.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{item.username}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> added points to </Text>
                                <TouchableOpacity onPress={()=>Player.playVideo(item.entryUid)}>
                                    <Text style={styles.link}>a song</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <HomeFeedDivider/>
                    </View>
                );
                break;
            case 2:
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <Image style={styles.profilePic} source={{uri:item.avatarUrl}}/>
                            <View style={styles.infoWrap}>
                                <TouchableOpacity onPress={()=>Router.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{item.username}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> released </Text>
                                <TouchableOpacity onPress={()=>this.goToEntry(item.entryUid)}>
                                    <Text style={styles.link}> a new song</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <HomeFeedDivider/>
                    </View>
                );
                break;
            case 3:
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <Image style={styles.profilePic} source={{uri:item.avatarUrl}}/>
                            <View style={styles.infoWrap}>
                                <TouchableOpacity onPress={()=>Router.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{item.username}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> followed</Text>
                                <TouchableOpacity onPress={()=>this.goToList(item.listUid)}>
                                    <Text style={styles.link}> a playlist </Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>by </Text>
                                <TouchableOpacity onPress={()=>Router.goToProfile(item.listAdminUid)}>
                                    <Text style={styles.link}>{item.listAdminUsername}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <HomeFeedDivider/>
                    </View>
                );
                break;
            case 4:
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <Image style={styles.profilePic} source={{uri:item.avatarUrl}}/>
                            <View style={styles.infoWrap}>
                                <TouchableOpacity onPress={()=>Router.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{item.ownerName}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> created a new</Text>
                                <TouchableOpacity onPress={()=>Router.goToList(item.listUid)}>
                                    <Text style={styles.link}> playlist</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <HomeFeedDivider/>
                    </View>
                );
                break;
            default:
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <Image style={styles.profilePic} source={{uri:item.avatarUrl}}/>
                            <View style={styles.infoWrap}>
                                <TouchableOpacity onPress={()=>Router.goToProfile(item.uid)}>
                                    <Text style={styles.link}>{item.username}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> added</Text>
                                <TouchableOpacity onPress={()=>this.goToEntry(item.entryUid)}>
                                    <Text style={styles.link}> a song</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}> to</Text>
                                <TouchableOpacity onPress={()=>Router.goToList(item.listUid)}>
                                    <Text style={styles.link}> a playlist</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>.</Text>
                                <Text style={styles.timeText}> {Time.timeDifference(item.creationTimestamp)}</Text>
                            </View>
                        </View>
                        <HomeFeedDivider/>
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
            return( <ActivityIndicatorIOS hidden='true' size='small' color="#1eaeff" style={styles.footer} /> );
        }
    },
    onEndReached () {
        if(this.state.isLoading){
            return;
        }
        this.setState({
            isLoading: true
        });
         this.getUserNotifications();
    },
    render () {
        return (
            <View style={styles.bgContainer}>
                <NavBar backBtn={false} fwdBtn={false} logoType={true} transparentBackground={false}/>
                <View style={styles.container}>
                     <ListView
                        dataSource={this.getNotificationsDataSource()}
                        renderRow={this.renderRow}
                        automaticallyAdjustContentInsets={false}
                        onEndReached={this.onEndReached}
                        style={styles.listview}
                        renderFooter={this.renderFooter}
                        />

                </View>
            </View>
        );
    }
});

module.exports = HomeFeed;