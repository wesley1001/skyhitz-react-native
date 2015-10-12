'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    } = React;

var deviceWidth = require('Dimensions').get('window').width;
var precomputeStyle = require('precomputeStyle');
var TAB_UNDERLINE_REF = 'TAB_UNDERLINE';

var styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0,
    },

    tabs: {
        height: 40,
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop: 10,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: '#ccc',
        backgroundColor: '#ffffff'
    },
});

var CustomTabBar = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array
    },

    renderTabOption(name, page) {
        var isTabActive = this.props.activeTab === page;

        return (
            <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)}>
                <View style={[styles.tab]}>
                    <Text style={{color: isTabActive ? '#1eaeff' : 'black',fontFamily:'Avenir',fontSize:12}}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    },

    setAnimationValue(value) {
        this.refs[TAB_UNDERLINE_REF].setNativeProps(precomputeStyle({
            left: (deviceWidth * value) / this.props.tabs.length
        }));
    },

    render() {
        var numberOfTabs = this.props.tabs.length;
        var tabUnderlineStyle = {
            position: 'absolute',
            width: deviceWidth / numberOfTabs,
            height: 1,
            borderBottomWidth:2,
            borderBottomColor: '#1eaeff',           
            backgroundColor: '#1eaeff',
            bottom: 0,
        };

        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                <View style={tabUnderlineStyle} ref={TAB_UNDERLINE_REF} />
            </View>
        );
    },
});

module.exports = CustomTabBar;