'use strict';

var React = require('react-native');
var Router = require('../../utils/services/router');
var Home = require('./home/home');
var Search = require('./search/main');
var Lists = require('./lists/main');
var Profile = require('./profile/main');
var Settings = require('./settings/settings');
var SkyhitzTab = require('../tabbar/skyhitz');
var TabNavigator = require('react-native-tab-navigator');
var Icon = require('react-native-vector-icons/Ionicons');

var {
  StyleSheet,
  View
  } = React;

var styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#edf1f2'
  },
  tabIcon: {
    top: 3
  }
});

var MainTabBar = React.createClass({
  getInitialState(){
    return {
      selectedTab: Router.route.selectedTab ? Router.route.selectedTab : 'home',
      notificationCount: 0
    }
  },
  render(){
    return (
      <View style={styles.appContainer}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            renderIcon={() => <Icon name="android-home" size={28} color="#ccc" style={styles.tabIcon}/>}
            renderSelectedIcon={() => <Icon name="android-home" size={28} color="#eee" style={styles.tabIcon}/>}
            badgeText={this.state.notificationCount}
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <Home/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'search'}
            renderIcon={() => <Icon name="search" size={28} color="#ccc" style={styles.tabIcon}/>}
            renderSelectedIcon={() => <Icon name="search" size={28} color="#eee" style={styles.tabIcon}/>}
            onPress={() => this.setState({ selectedTab: 'search' })}>
            <Search/>
          </TabNavigator.Item>
          <TabNavigator.Item
            skyhitzTab={true}
            selected={this.state.selectedTab === 'lists'}
            renderIcon={() => <SkyhitzTab onPress={() => this.setState({ selectedTab: 'lists' })}/>}
            >
            <Lists/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            renderIcon={() => <Icon name="person" size={28} color="#ccc" style={styles.tabIcon}/>}
            renderSelectedIcon={() => <Icon name="person" size={28} color="#eee" style={styles.tabIcon}/>}
            onPress={() => this.setState({ selectedTab: 'profile' })}>
            <Profile/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'settings'}
            renderIcon={() => <Icon name="gear-a" size={28} color="#ccc" style={styles.tabIcon}/>}
            renderSelectedIcon={() => <Icon name="gear-a" size={28} color="#eee" style={styles.tabIcon}/>}
            onPress={() => this.setState({ selectedTab: 'settings' })}>
            <Settings/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
});

module.exports = MainTabBar;
