'use strict';

var React = require('react-native');
var Router = require('../../../utils/services/router');
var CustomNav = require('../../navbar/customnav');
var HomeFeedDivider = require('../../helpers/homefeeddivider');
var ListsApi = require('../../../utils/services/lists');
var Divider = require('../../helpers/searchdivider');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var NavBar = require('../../navbar/navbar');

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
    info: {
        flex: 1
    },
    container: {
        flex: 1
    },
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
        justifyContent:'space-around',
        flexWrap:'nowrap',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        backgroundColor: '#edf1f2',
        flex:1
    },
    leftRowSection:{
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
    searchArtistTitle:{
        fontSize:12,
        fontFamily:'Avenir',
        textAlign:'left',
        paddingLeft:10
    },
    title:{
        fontSize:12,
        fontFamily:'Avenir',
        textAlign:'left',
        paddingLeft:10,
        marginTop:2
    }
});

var AddToPlaylist = React.createClass({
    getInitialState() {
        return {
            playlistsDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            entryUid:Router.route.passProps.youtubeData.id.videoId
        }
    },
    getPlaylistsDataSource: function(data: Array<any>): ListView.DataSource {
        return this.state.playlistsDataSource.cloneWithRows(data);
    },
    componentDidMount() {

        this.getPlaylists();

    },
    goToList(listUid){

        this.props.navigator.push({
            id:'list',
            listUid:listUid
        });

    },
    addToPlaylist(item){

        var that = this;
       ListsApi.addEntryToPlaylist(item, this.state.entryUid)
       .then(function(bool){

                   that.goToList(item.listUid);
           });

    },
    getPlaylists(){

        var that = this;

        ListsApi.getUserPlaylists().then(function(list){
            that.list = list;
            that.setState({
                isLoading: false,
                passProps: that.list,
                playlistsDataSource: that.getPlaylistsDataSource(list)
            });

        }).catch(function(error){


        });

    },
    componentDidUnmount() {
        // TODO: resolve go back property _currentElement
        this.goBack();

    },    
    goBack(){

        Router.navigator.jumpBack();

    },    
    renderPlaylistRow(item){

        return(
            <View>
                <View style={styles.rowWrap}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={()=>this.addToPlaylist(item)}>
                            <View style={styles.leftRowSection}>
                                <Image source={require('image!playlisticon')} style={styles.playlistIcon}/>
                                <View style={styles.info}>
                                    <Text style={styles.searchArtistTitle}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Divider style={styles.horDivider}/>
            </View>
        )

    },
    render(){
        return(
            <View>
                <View style={styles.customNav}>
                        <NavBar title='Add To Playlist' backBtn={true} backPressFunc={this.componentDidUnmount} />
                </View>
                <View style={styles.container}>

                    <ListView
                        dataSource={this.state.playlistsDataSource}
                        renderRow={this.renderPlaylistRow}
                        style={styles.listview}
                        automaticallyAdjustContentInsets={false}
                        contentInset={{bottom: 0}}
                        />

                </View>
            </View>
        )
    }
});

module.exports = AddToPlaylist;