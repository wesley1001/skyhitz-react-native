/**
 * LoadingView
 */
'use strict';

var React = require('react-native');

var {
    TouchableWithoutFeedback,
    Animated,
    StyleSheet,
    Image,
    View,
    Easing
    } = React;


var LoadingView = React.createClass({

    getInitialState() {
        return {
            angle: new Animated.Value(0),
        };
    },

    componentDidMount() {
        this._animate();
    },

    _animate() {
        this.state.angle.setValue(0);
        this._anim = Animated.timing(this.state.angle, {
            toValue: 360,
            duration: 800,
            easing: Easing.linear
        }).start(this._animate);
    },
    render() {
        return (
            <View style={styles.container}>
                <Animated.Image
                    source={require('image!logo')}
                    style={[
              styles.rotateCard,
              {transform: [
                {rotate: this.state.angle.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg']
                })},
              ]}]}>
                </Animated.Image>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rotateCard: {
        width:35,
        height:35,
        justifyContent:'center',
        backgroundColor:'transparent'
    }
});


module.exports = LoadingView;
