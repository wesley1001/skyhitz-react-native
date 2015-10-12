'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');
var CustomNav = require('../navbar/customnav');
var HomeFeedDivider = require('../helpers/homefeeddivider');
var ListsApi = require('../../utils/services/lists');
var youtubeApi = require('../../utils/services/youtubeapi');
var User = require('../../utils/services/user');
var Divider = require('../helpers/searchdivider');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var BackBtn = require('../navbar/backbtn');
var FwdBtn = require('../navbar/fwdbtn');
var Plus = require('../helpers/plus');
var Minus = require('../helpers/minus');
var entryApi = require('../../utils/services/entry');
var EntryTitle = require('../../utils/entrytitle');

var {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    PixelRatio,
    TextInput,
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
        width:windowSize/3
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
        marginLeft:53.5
    },
    create:{
        fontSize:20,
        color: '#FFFFFF',
        fontFamily:'Avenir',
        marginRight:10
    },
    customNav:{
        height:64,
        backgroundColor:'#111111',
        paddingTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'nowrap'
    },
    topContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        padding:20,
        flexWrap:'nowrap',
        backgroundColor:'white',
        alignItems:'center'
    },
    listPic:{
        width:50,
        height:50,
        borderRadius:25,
        borderWidth:1,
        borderColor:'#1dadff'
    },
    addpic:{
        textAlign:'center',
        fontFamily:'Avenir',
        fontSize:10
    },
    playlistInfo:{
        textAlign:'left',
        fontFamily:'Avenir',
        fontSize:10
    },
    listInfo:{
        paddingLeft:20
    },
    textWrap:{
        marginTop:12,
        width:30,
        alignSelf:'center'
    },
    playlistName:{
        color:'black',
        height:30,
        fontFamily:'Avenir',
        fontSize:12,
        width:200
    },
    textFieldWrap:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    searchFieldWrap:{
        borderBottomWidth:0.5,
        borderColor:'black',
        marginLeft:20,
        flex:1,
        marginTop:20
    },
    bottomContainer:{
        flex:1,
        backgroundColor:'white'
    },
    container:{
        backgroundColor:'white',
        flex:1
    },
    redInput:{
        color:'red',
        fontFamily:'Avenir',
        fontSize:12,
        marginRight:10
    },
    blackInput:{
        color:'black',
        fontFamily:'Avenir',
        fontSize:12,
        marginRight:10
    },
    fwdWithOpacity:{
        opacity: 0.5
    },
    SearchTabImg: {
        width:30,
        height:30
    },
    searchspace:{
        height:40,
        backgroundColor:'rgba(31,31,31,0.9)'
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
        backgroundColor:'white'
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
        fontFamily:'Gotham-Book',
        textAlign:'left',
        paddingLeft:10,
        marginBottom:2,
        marginTop:1

    },
    title:{
        fontSize:10,
        fontFamily:'Avenir',
        textAlign:'left',
        paddingLeft:10,
        marginTop:2
    },
    communityTab:{
        backgroundColor:'white'
    }
});

var CreateList = React.createClass({
    getInitialState(){
        return {
            lastQuery:'',
            editable:true,
            activeFwd: false,
            searchListData: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        }
    },
    entries:[],
    addMode:false,

    getSearchListData: function(data: Array<any>): ListView.DataSource {
        return this.state.searchListData.cloneWithRows(data);
    },
    componentDidMount () {
        this.setState({
            searchListData: this.getSearchListData(this.entries)
        });
    },
    searchSongs(q){
        var that = this;
        this.addMode = true;
        youtubeApi.searchMusic(q).then(function(response){
            that.setState({
                searchListData: that.getSearchListData(response.items)
            });
        }).catch((error) => {
            console.warn(error);
        });
    },
    onChangeText(text){
        this.setState({
            lastQuery: text
        });
        this.searchSongs(text);
    },
    selectEntry(entry){
        this.addMode = false;

        this.textInput.setNativeProps({text: ''});

        this.entries.push(entry);

        this.indexEntry(entry);

        this.setState({
                    searchListData: this.getSearchListData(this.entries)
                });
    },
    deleteEntry(entry, ref, index){

        delete this.entries[index];

        this.setState({
            searchListData: this.getSearchListData(this.entries)
        });

    },
    indexEntry(entry){

        var that = this;

        entryApi.indexEntry(entry).then(function(index){


        });

    },
    createList(){
        var list = {
            uid: User.getUid(),
            name: Router.route.listName,
            ownerName:User.userData.username,
            entries:[],
            avatar:Router.route.avatar ? Router.route.avatar:''
        };
        for (var i=0; i < this.entries.length; i++) {
            if(this.entries[i]){
           list.entries[this.entries[i].id.videoId] = true;
            }
        }
        ListsApi.createList(list).then(function(listUid){
                Router.goToList(listUid);
        });
    },
    nameChanged(text){
        return 25 - text.length;
    },
    getNumberStyle(){
        if(!this.state.activeFwd){
            return styles.redInput;
        }else{
            return styles.blackInput;
        }
    },
    goToAddSongs(){
        if(this.state.activeFwd === true){
            this.props.navigator.push({
                id:'addentriestolist'
            });
        }
    },
    renderSongRow (item, ref, index){
        if(this.addMode == true){
        return (
            <View>
                <View style={styles.rowWrapp}>
                    <View style={styles.row}>
                        <View style={styles.leftRowSection}>
                        <Image source={{uri:item.snippet.thumbnails.default.url}} style={styles.thumb}/>
                        <View style={styles.info}>
                            <Text style={styles.searchArtistTitle}>{EntryTitle.getArtistName(item.snippet.title)}</Text>
                            <Text style={styles.title}>{EntryTitle.getSongTitle(item.snippet.title)}</Text>
                        </View>
                        </View>
                        <Plus onPress={()=>this.selectEntry(item)}/>
                    </View>
                </View>
                <Divider style={styles.horDivider}/>
            </View>
        )
        } else{
            return (
                <View>
                    <View style={styles.rowWrapp}>
                        <View style={styles.row}>
                            <View style={styles.leftRowSection}>
                                <Image source={{uri:item.snippet.thumbnails.default.url}} style={styles.thumb}/>
                                <View style={styles.info}>
                                    <Text style={styles.searchArtistTitle}>{EntryTitle.getArtistName(item.snippet.title)}</Text>
                                    <Text style={styles.title}>{EntryTitle.getSongTitle(item.snippet.title)}</Text>
                                </View>
                            </View>
                            <Minus onPress={()=>this.deleteEntry(item, ref, index)}/>
                        </View>
                    </View>
                    <Divider style={styles.horDivider}/>
                </View>
            )
        }
    },
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.customNav}>
                    <BackBtn navigator={this.props.navigator}/>
                    <View style={styles.logoType}>
                        <Text style={styles.brandName}>{Router.route.listName}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this.createList} style={styles.create}>
                       <Text style={styles.create}>Create</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={styles.bottomContainer}>
                        <View style={styles.textFieldWrap}>
                            <Image style={styles.SearchTabImg}
                                   source={require('image!search-tab-icon-white')}></Image>
                            <View style={styles.searchFieldWrap}>
                            <TextInput
                                ref={component => this.textInput = component}
                                autoCapitalize="none"
                                placeholder="Search for Songs"
                                autoCorrect={false}
                                style={styles.playlistName}
                                placeholderTextColor="black"
                                value={this.state.lastQuery}
                                onChangeText={this.onChangeText}
                                />
                              </View>
                        </View>
                        <ListView
                            dataSource={this.state.searchListData}
                            renderRow={this.renderSongRow}
                            style={styles.listview}
                            automaticallyAdjustContentInsets={false}
                            showsVerticalScrollIndicator={true}
                            pagingEnabled={true}
                            contentInset={{bottom: 0}}
                            />
                    </View>
                </View>
            </View>
        )
    }
});

module.exports = CreateList;