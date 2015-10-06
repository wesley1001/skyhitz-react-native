'use strict';

var React = require('react-native');
var Divider = require('../../../helpers/homefeeddivider');


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
    playlistIconWrap:{

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
        fontFamily:'Gotham-Light',
        fontSize:12
    },
    addNewText:{
        color:'#1dadff',
        fontFamily:'Gotham-Light',
        fontSize:12,
        marginRight:10
    },
    addNew:{
        marginRight:10
    },
    playlistText:{
        fontFamily:"Gotham-Bold",
        color:"#626363"
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
        flexWrap:"nowrap"
    },
    followerSection:{
        flex:1
    },
    followersCount:{
        marginRight:10,
        fontSize:10,
        fontFamily:'Gotham-Light'
    }
});

var Followers = React.createClass({

    addNewList(){

        this.props.navigator.push({
            id:'createlist'
        });

    },
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>YOUR PLAYLISTS</Text>
                </View>
                <Divider/>
                <View style={styles.row}>
                    <View style={styles.leftSection}>
                        <TouchableOpacity style={styles.playlistIconWrap}>
                            <Image source={require('image!playlisticon')} style={styles.playlistIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playlistTitle}>
                            <Text style={styles.playlistText}>SLOW JAMS</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.followersSection}>
                        <Text style={styles.followersCount}>13 followers</Text>
                    </TouchableOpacity>
                </View>
                <Divider/>
                <View style={styles.row}>
                    <View style={styles.leftSection}>
                        <TouchableOpacity style={styles.playlistIconWrap}>
                            <Image source={require('image!playlisticon')} style={styles.playlistIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playlistTitle}>
                            <Text style={styles.playlistText}>DISCO NIGHTS</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.followersSection}>
                        <Text style={styles.followersCount}>13 followers</Text>
                    </TouchableOpacity>
                </View>
                <Divider/>
                <View style={styles.header}>
                    <Text style={styles.headerText}>PLAYLISTS YOU FOLLOW</Text>
                </View>
                <Divider/>
                <View style={styles.row}>
                    <View style={styles.leftSection}>
                        <TouchableOpacity style={styles.playlistIconWrap}>
                            <Image source={require('image!playlisticon')} style={styles.playlistIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playlistTitle}>
                            <Text style={styles.playlistText}>ELECTRO HOUSE</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.followersSection}>
                        <Text style={styles.followersCount}>13 followers</Text>
                    </TouchableOpacity>
                </View>
                <Divider/>
                <View style={styles.row}>
                    <View style={styles.leftSection}>
                        <TouchableOpacity style={styles.playlistIconWrap}>
                            <Image source={require('image!playlisticon')} style={styles.playlistIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playlistTitle}>
                            <Text style={styles.playlistText}>DEEP HOUSE</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.followersSection}>
                        <Text style={styles.followersCount}>13 followers</Text>
                    </TouchableOpacity>
                </View>
                <Divider/>

            </View>
        )
    }

});

module.exports = Followers;