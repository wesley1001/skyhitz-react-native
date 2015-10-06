'use strict';

var React = require('react-native');

var {
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
    View,
    Component
    } = React;

var Follow = React.createClass({
    renderFollow(){

        if(true){

            return(
                <View style={styles.followWrap}>
                    <View style={styles.plusFollow}>
                        <View style={styles.plusHor}></View>
                        <View style={styles.plusVer}></View>
                    </View>
                    <Text>Follow</Text>
                </View>
            )

        }else{

            return(
                <View style={styles.followingWrap}>
                    <View style={styles.followingCheckWrap}>
                        <View></View>
                    </View>
                    <Text>Following</Text>
                </View>
            )
        }

    },
    follow(){

        this.props.navigator.jumpBack();

    },
    render(){
        return(
            <View style={styles.followBtn}>
                <TouchableOpacity onPress={this.follow}>
                    <View style={styles.followWrap}>
                        <View style={styles.plusFollow}>
                            <View style={styles.plusHor}></View>
                            <View style={styles.plusVer}></View>
                        </View>
                        <Text style={styles.followText}>Follow</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    navBarLeftButton: {
        marginLeft: 10,
        width:11.5,
        height:19.5
    },
    followWrap:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#1dadff',
        borderWidth:0.5,
        borderRadius:2,
        paddingRight:10,
        paddingLeft:10,
        height:20
    },
    plusFollow:{
        width: 9,
        height:9
    },
    plusHor:{
        width: 8,
        height:0.5,
        backgroundColor:'#1dadff',
        position:'absolute',
        top:3.75
    },
    plusVer:{
        height:8,
        width:0.5,
        backgroundColor:'#1dadff',
        position:'absolute',
        left:3.75
    },
    followingCheckWrap:{
        width:20,
        height:20
    },
    followText:{
        fontFamily:'Gotham-Light',
        fontSize:8,
        color:'#1dadff',
        paddingTop:2,
        paddingLeft:4
    },
    followBtn:{
        marginRight:10
    }
});

module.exports = Follow;