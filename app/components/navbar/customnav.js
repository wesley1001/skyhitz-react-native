'use strict';

var React = require('react-native');
var LogoType = require('./logotype');

var {
    TouchableOpacity,
    Image,
    View,
    Text,
    StyleSheet,
    Component
    } = React;

class CustomNav extends Component{
    render(){
        return(
            <View style={styles.customNav}>
                <LogoType/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    customNav:{
        height:64,
        backgroundColor:'#111111',
        paddingTop:20
    }
});

module.exports = CustomNav;