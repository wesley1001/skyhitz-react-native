var React = require('react-native');
var Overlay = require('react-native-overlay');
var Loading = require('./loadingctrl');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var BlurView = require('react-native-blur').BlurView;
var SkyhitzLoader = require('../animations/loading');

var {
    View,
    ActivityIndicatorIOS,
    StyleSheet,
    } = React;


var LoadingOverlay = React.createClass({
    render() {
        return (

            <Overlay isVisible={this.props.isVisible}>
                <View style={[styles.wrap, {opacity: this.props.opacity}]}>
                <BlurView style={styles.background} blurType="dark">
                    <SkyhitzLoader/>
                 </BlurView>
                </View>
            </Overlay>

        );
    }

});

var styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        width: windowSize.width,
        height: windowSize.height
    },
    wrap:{
        flex: 1
    }
});

module.exports = LoadingOverlay;