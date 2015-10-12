'use strict';

var React = require('react-native');

var {
    TouchableOpacity,
    Image,
    View,
    Text,
    StyleSheet,
    Component
    } = React;

class LogoType extends Component{
    render(){
        return(
            <TouchableOpacity
                onPress={this.props.onPress}>
                <View style={styles.logoType}>
                    <Text style={styles.brandName}>SKYHITZ</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    logoType:{
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'nowrap'
    },
    logo:{
        width:29.4,
        height:22.44,
        marginTop:4
    },
    brandName:{
        fontSize:18,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily:'Avenir',
        letterSpacing: 10,
        marginTop:2,
        marginLeft:10
    }
});

module.exports = LogoType;