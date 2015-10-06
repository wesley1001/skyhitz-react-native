'use strict';

var React = require('react-native');
var Router = require('../../../utils/services/router');
var CustomNav = require('../../navbar/customnav');
var HomeFeedDivider = require('../../helpers/homefeeddivider');
var ListsApi = require('../../../utils/services/lists');
var Divider = require('../../helpers/searchdivider');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

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
        fontFamily:'Gotham-Light',
        marginLeft:9
    },
    customNav:{
        height:64,
        backgroundColor:'#111111',
        paddingTop:20
    },
    listview:{
        backgroundColor:'white',
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
        backgroundColor:'white',
        flex:1
    },
    leftRowSection:{
        flexDirection:'row',
        justifyContent:'flex-start',
        flexWrap:'nowrap',
        alignItems:'center',
        flex:1
    },
    rowWrapp:{
        flex:1,
        backgroundColor:'white',
        height:50
    },
    searchArtistTitle:{
        fontSize:10,
        fontFamily:'Gotham-Bold',
        textAlign:'left',
        paddingLeft:10
    },
    title:{
        fontSize:10,
        fontFamily:'Gotham-Light',
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
    componentDidMount () {

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

                   that.goToList(item.public.listUid);
           });

    },
    getPlaylists(){

        var that = this;

        ListsApi.getUserPlaylists().then(function(list){

            that.setState({
                isLoading: false,
                playlistsDataSource: that.getPlaylistsDataSource(list)
            });

        }).catch(function(error){


        });

    },
    renderPlaylistRow(item){

        return(
            <View>
                <View  style={styles.rowWrapp}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={()=>this.addToPlaylist(item)}>
                            <View style={styles.leftRowSection}>
                                <Image source={require('image!playlisticon')} style={styles.playlistIcon}/>
                                <View style={styles.info}>
                                    <Text style={styles.searchArtistTitle}>{item.public.name}</Text>
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
                        <View style={styles.logoType}>
                            <Text style={styles.brandName}>ADD TO PLAYLIST</Text>
                        </View>
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