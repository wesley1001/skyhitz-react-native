'use strict';

var React = require('react-native');

var {
    TouchableOpacity,
    StyleSheet,
    View,
    Component
    } = React;

class MenuBtn extends Component{
    render(){
        return(
            <TouchableOpacity
                onPress={this.props.onPress} style={styles.btnWrap}>
                <View style={styles.navBarRightButton}>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                </View>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    navBarRightButton: {
        marginRight: 15,
        flexDirection:'column'
    },
    dot:{
        width:4,
        height:4,
        backgroundColor:'white',
        borderRadius:2,
        marginTop:2,
        marginBottom:2,
        flex:1
    },
    btnWrap:{
        paddingTop:2,
        paddingBottom:2,
        paddingRight: 10,
        width:70,
        flexDirection:'row',
        justifyContent:'flex-end'
    }
});

module.exports = MenuBtn;