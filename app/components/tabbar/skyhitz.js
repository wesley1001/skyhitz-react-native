'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
    TouchableOpacity,
    Animated,
    Easing,
    TouchableHighlight,
    Image,
    StyleSheet,
    View,
    Component
    } = React;

var SkyhitzTab = React.createClass({
    getInitialState() {
        return {
            angle: new Animated.Value(0),
        };
    },
    _animate() {
        this.state.angle.setValue(0);
        this._anim = Animated.timing(this.state.angle, {
            toValue: 360,
            duration: 800,
            easing: Easing.linear
        }).start();
        this.props.onPress();
    },
    render(){
        return(
            <TouchableHighlight style={styles.SkyhitzTab} onPress={this._animate}>
                <Animated.Image
                    source={require('image!logo')}
                    style={[
                    styles.SkyhitzTabImg,
                       {transform: [
                         {rotate: this.state.angle.interpolate({
                           inputRange: [0, 360],
                           outputRange: ['0deg', '360deg']
                         })},
                       ]}
                      ]}>
                </Animated.Image>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    SkyhitzTab: {
        width:60,
        height:60,
        borderWidth:2,
        borderRadius:31,
        borderColor:'#24252b',
        backgroundColor:'#292b33',
        alignItems: 'center',
        justifyContent: 'center'
    },
    SkyhitzTabImg: {
        width:42.5,
        height:32.5,
        bottom: 2
    }
});

module.exports = SkyhitzTab;