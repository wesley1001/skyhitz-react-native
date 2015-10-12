
'use strict';

var React = require('react-native');
var HomeFeedDivider = require('../../helpers/homefeeddivider');
var HomeFeedApi = require('../../../utils/services/homefeed');
var User = require('../../../utils/services/user');
var Time = require('../../../utils/time');
var Slider = require('./slider');
var Router = require('../../../utils/routers/home');
var Player = require('../../player/player');

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
        backgroundColor:'white',
        flex:1
    },
    rowContainer:{
        backgroundColor:'white'
    },
    streamline:{
        height:24,
        paddingLeft:50,
        backgroundColor:'white'
    },
    streamText:{
        color:'#626363',
        fontFamily:'Gotham-Book',
        fontSize:12,
        paddingTop:8
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
      fontFamily:'Gotham-Book',
      fontSize:11
    },
    text: {
        color:'#626363',
        fontFamily:'Gotham-Book',
        fontSize:11
    },
    timeText:{
        color:'#cfcdcd',
        fontFamily:'Gotham-Book',
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
            isLoading: true,
            notifications:[],
            noMoreData:false,
            headerSections:[{slider:true},{header:true}],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
    },
    componentDidMount () {
        this.getUserNotifications();
    },
    getUserNotifications(){
        var that = this;
        if(this.state.noMoreData === false){
            this.setState({
                isLoading: true
            });
            HomeFeedApi.getHomeNotifications(User.getUid()).then(function(data){
                if(data === false){
                    that.endOfData();
                } else {
                    data[0] = {slider:true};
                    data[1] = {header:true};
                    that.setState({
                        isLoading: false,
                        dataSource: that.state.dataSource.cloneWithRows(data)
                    });
                }
            });
        }
    },
    endOfData(){
        this.setState({
            isLoading: false,
            noMoreData:true
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
                                <TouchableOpacity onPress={()=>this.goToProfile(item.uid)}>
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
                                <TouchableOpacity onPress={()=>this.goToProfile(item.listAdminUid)}>
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
            return( <ActivityIndicatorIOS hidden='true' size='large' color="#1eaeff" style={styles.footer} /> );
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
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    automaticallyAdjustContentInsets={false}
                    onEndReached={this.onEndReached}
                    style={styles.listview}
                    renderFooter={this.renderFooter}
                    />

            </View>
        );
    }
});

module.exports = HomeFeed;