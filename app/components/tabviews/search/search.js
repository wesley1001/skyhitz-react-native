'use strict';

var React = require('react-native');
var Router = require('../../../utils/services/router');
var SearchBar = require('react-native-search-bar');
var CustomNav = require('../../navbar/customnav');
var youtubeApi = require('../../../utils/services/youtubeapi');
var FirebaseRef = require('../../../utils/services/firebase-ref');
var entryApi = require('../../../utils/services/entry');
var Divider = require('../../helpers/searchdivider');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var CustomTabBar = require('./customtabs');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var EntryTitle = require('../../../utils/entrytitle');
var Player = require('../../player/player');

var {
    StyleSheet,
    View,
    Text,
    Image,
    Navigator,
    TouchableOpacity,
    ScrollView,
    PixelRatio,
    ListView,
    Component
    } = React;

var styles = StyleSheet.create({
    searchspace: {
        height: 40,
        backgroundColor: 'rgba(31,31,31,0.9)'
    },
    listview: {
        backgroundColor: '#edf1f2',
        width: windowSize.width

    },
    container: {
        backgroundColor: 'rgba(41, 43, 51, .99)',
        paddingTop: 20,
        flex: 1
    },
    thumb: {
        width: 40,
        height: 30
    },
    thumbRound: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        backgroundColor: '#edf1f2'
    },
    rowWrap: {
        flex: 1,
        backgroundColor: '#edf1f2',
        height: 50
    },
    searchArtistTitle: {
        fontSize:12,
        fontFamily: 'Avenir',
        textAlign: 'left',
        paddingLeft: 10,
        marginBottom: 2,
        marginTop: 1,
        color:'#51585e'
    },
    title: {
        fontSize:12,
        fontFamily: 'Avenir',
        textAlign: 'left',
        fontWeight: 'bold',        
        paddingLeft: 10,
        marginTop: 2,
        color:'#51585e'
    },
    communityTab: {
        backgroundColor: '#edf1f2',
        flex: 1
    },
    searchTabs: {
        flex: 1
    },
    footer: {
        height: 49,
        flex: 1,
        alignSelf: 'center'
    }
});

var Search = React.createClass({
    getInitialState() {
        return {
            songDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            communityDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            selectedSearchTab: 0,
            lastQuery: ''
        }
    },
    getSongDataSource: function (data:Array<any>):ListView.DataSource {
        return this.state.songDataSource.cloneWithRows(data);
    },
    getCommunityDataSource: function (data:Array<any>):ListView.DataSource {
        return this.state.communityDataSource.cloneWithRows(data);
    },
    componentDidMount () {
        this.searchSongs('');
    },
    searchSongs(q){
        var that = this;
        youtubeApi.searchMusic(q).then(function (response) {
            that.setState({
                isLoading: false,
                songDataSource: that.getSongDataSource(response.items)
            });
        });
    },
    searchUsers(q){
        var that = this;
        youtubeApi.searchChannel(q).then(function (res) {
            var queryString = '';
            for (var i = 0; i < res.items.length; i++) {
                if(i == 0){
                    queryString = queryString.concat(res.items[i].snippet.channelId)
                }else{
                    queryString = queryString.concat(',').concat(res.items[i].snippet.channelId)
                }
            }
            youtubeApi.getChannels(queryString).then(function (response) {
                var finalArray = [];
                for (var i = 0; i < response.items.length; i++) {
                    response.items[i].snippet.channelTitle = res.items[i].snippet.channelTitle;
                    if(response.items[i].statistics.subscriberCount > 10000){
                        finalArray[response.items[i].id] = response.items[i]
                    }
                }
                if(q == ''){
                    finalArray = []
                }
                that.setState({
                    isLoading: false,
                    communityDataSource: that.getCommunityDataSource(finalArray)
                });
            })
        })
    },
    similar(a,b) {
        var lengthA = a.length;
        var lengthB = b.length;
        var equivalency = 0;
        var minLength = (a.length > b.length) ? b.length : a.length;
        var maxLength = (a.length < b.length) ? b.length : a.length;
        for(var i = 0; i < minLength; i++) {
            if(a[i] == b[i]) {
                equivalency++;
            }
        }
        var weight = equivalency / maxLength;
        return (weight * 100);
    },
    onChangeText(text){
        this.setState({
            lastQuery: text
        });
        if (this.state.selectedSearchTab == 0) {
            this.searchSongs(text);
        } else {
            this.searchUsers(text);
        }
    },
    tabChanged(i, ref){
        if (i.i === 0) {
            this.searchSongs(this.state.lastQuery);
        } else {
            this.searchUsers(this.state.lastQuery);
        }
        this.setState({
            selectedSearchTab: i.i
        });
    },
    renderSongRow (entry){
        return (
            <View>
                <TouchableOpacity onPress={()=> Player.playVideo(entry.id.videoId, entry.snippet.title, entry)} style={styles.rowWrap}>
                    <View style={styles.row}>
                        <Image source={{uri:entry.snippet.thumbnails.default.url}} style={styles.thumb}/>
                        <View style={styles.info}>
                            <Text style={styles.title}>{EntryTitle.getSongTitle(entry.snippet.title)}</Text>                        
                            <Text style={styles.searchArtistTitle}>{EntryTitle.getArtistName(entry.snippet.title)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Divider style={styles.horDivider}/>
            </View>
        )
    },
    renderCommunityRow (entry){
        return (
            <View>
                <TouchableOpacity onPress={()=>Router.goToProfile(entry)} style={styles.rowWrap}>
                    <View style={styles.row}>
                        <Image source={{uri:entry.snippet.thumbnails.default.url}} style={styles.thumbRound}/>
                        <View style={styles.info}>
                            <Text style={styles.title}>{entry.snippet.title}</Text>                        
                            <Text style={styles.searchArtistTitle}>{entry.snippet.channelTitle}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Divider style={styles.horDivider}/>
            </View>
        )
    },
    renderFooter(){
        return (
            <View style={styles.footer}></View>
        );
    },
    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Search"
                    hideBackground={true}
                    showsCancelButton={false}
                    tintColor='#FFFFFF'
                    onChangeText={this.onChangeText}
                    />
                <ScrollableTabView onChangeTab={this.tabChanged} renderTabBar={() => <CustomTabBar someProp={'here'} />}
                                   style={styles.searchTabs}>
                    <View tabLabel="SONGS">
                        <ListView
                            dataSource={this.state.songDataSource}
                            renderRow={this.renderSongRow}
                            style={styles.listview}
                            automaticallyAdjustContentInsets={false}
                            renderFooter={this.renderFooter}
                            />
                    </View>
                    <View tabLabel="INFLUENCERS" style={styles.communityTab}>
                        <ListView
                            dataSource={this.state.communityDataSource}
                            renderRow={this.renderCommunityRow}
                            style={styles.listview}
                            automaticallyAdjustContentInsets={false}
                            renderFooter={this.renderFooter}
                            />
                    </View>
                </ScrollableTabView>
            </View>
        )
    }
});

module.exports = Search;