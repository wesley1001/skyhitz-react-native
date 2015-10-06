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
    tab0: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0,
        width:100,
        backgroundColor:'white',
        height:30,
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
        borderLeftWidth:0.5,
        borderRightWidth:0.5,
        borderColor:'#1eaeff',
        borderBottomLeftRadius: 2,
        borderTopLeftRadius:2
    },

    tab0active: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0,
        width:100,
        backgroundColor:'#1eaeff',
        height:30,
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
        borderLeftWidth:0.5,
        borderRightWidth:0.5,
        borderColor:'#1eaeff',
        borderBottomLeftRadius: 2,
        borderTopLeftRadius:2
    },

    tab1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0,
        width:100,
        backgroundColor:'white',
        height:30,
        borderRightWidth:0.5,
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
        borderLeftWidth:0.5,
        borderColor:'#1eaeff',
        borderBottomRightRadius: 2,
        borderTopRightRadius:2
    },

    tab1active: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0,
        width:100,
        backgroundColor:'#1eaeff',
        height:30,
        borderRightWidth:0.5,
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
        borderLeftWidth:0,
        borderColor:'#1eaeff',
        borderBottomRightRadius: 2,
        borderTopRightRadius:2
    },

    tabs: {
        height: 40,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    }
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
                <View style={isTabActive ? styles['tab'+page+'active']: styles['tab'+page]}>
                    <Text style={{color: isTabActive ? 'white' : '#1eaeff',fontFamily:'Gotham-Light',fontSize:12}}>{name}</Text>
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
            height: 0,
            backgroundColor: '#1eaeff',
            bottom: 0
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