'use strict';

var React = require('react-native');
var NavBar = require('../navbar/navbar');
var Router = require('../../utils/services/router');
var HomeFeedDivider = require('../helpers/homefeeddivider');
var EntryApi = require('../../utils/services/entry');
var User = require('../../utils/services/user');
var BackBtn = require('../navbar/backbtn');
var Divider = require('../helpers/searchdivider');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Follow = require('../follow/follow');

var {
    StyleSheet,
    Navigator,
    View,
    Text,
    TouchableOpacity,
    Image,
    PixelRatio,
    ListView,
    Component
    } = React;

var styles = StyleSheet.create({
    navBarRightButton: {
        marginLeft: 10,
        width:11.5,
        height:19.5
    },
    playlistIcon:{
        width:10.5,
        height:11.9
    },
    logo:{
        width:30.24,
        height:24.48
    },
    container:{
        backgroundColor:'#111111',
        flex:1
    },
    customNav:{
        height:64,
        backgroundColor:'#111111',
        paddingTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    brandName:{
        fontSize:20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily:'Avenir'
    },
    logoType:{
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'nowrap',
        marginTop:7
    },
    listview:{
        backgroundColor: '#edf1f2',
        width:windowSize.width

    },
    thumb:{
        width:40,
        height:30
    },
    thumbRound:{
        width:40,
        height:40,
        borderRadius:20
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'nowrap',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        backgroundColor: '#edf1f2',
        flex:1
    },
    leftSection:{
        flexDirection:'row',
        justifyContent:'flex-start',
        flexWrap:'nowrap',
        alignItems:'center',
        flex:1
    },
    rowWrap:{
        flex:1,
        backgroundColor: '#edf1f2',
        height:50
    },
    username:{
        fontSize:12,
        fontFamily:'Avenir',
        textAlign:'left',
        paddingLeft:10
    },
    name:{
        fontSize:12,
        fontFamily:'Avenir',
        textAlign:'left',
        paddingLeft:10,
        marginTop:2
    },
    blankSpace:{
        backgroundColor:'transparent',
        width:11.5,
        height:19.5,
        marginRight:10
    }
});

var Likers = React.createClass({
    getInitialState() {
        return {
            likersDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            entryUid: Router.route.entryUid
        }
    },
    getLikersDataSource: function(data: Array<any>): ListView.DataSource {
        return this.state.likersDataSource.cloneWithRows(data);
    },
    componentDidMount () {

        this.getLikers();

    },
    goToProfile(user){

        this.props.navigator.push({
            id:'profile'
        })

    },
    getLikers(){

        var that = this;

        EntryApi.getLikers(this.state.entryUid).then(function(likers){

                that.setState({
                    isLoading: false,
                    likersDataSource: that.getLikersDataSource(likers)
                });

            }).catch(function(error){


            });

    },
    renderFollow(user){
        if(user.uid !== User.getUid()){return <Follow navigator={this.props.navigator} />}else{return null}
    },
    renderEntryRow(user){
        return(
            <View>
                <View style={styles.rowWrap}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={()=>this.goToProfile(user)}>
                        <View  style={styles.leftSection}>
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
    render(){
        return(
            <View style={styles.container}>
                <NavBar backBtn={true} fwdBtn={false} title="LIKERS" logoType={false} transparentBackground={false}/>
                <View>
                    <ListView
                        dataSource={this.state.likersDataSource}
                        renderRow={this.renderEntryRow}
                        style={styles.listview}
                        automaticallyAdjustContentInsets={false}
                        contentInset={{bottom: 0}}
                        />
                </View>
            </View>
        )
    }
});

module.exports = Likers;