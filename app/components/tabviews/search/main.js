'use strict';

var React = require('react-native');
var Router = require('../../../utils/routers/search');
var Profile = require('../profile/profile');
var Search = require('../search/search');

var {
  StyleSheet,
  View,
  Text,
  Navigator
  } = React;

var styles = StyleSheet.create({
  tabWrap: {
    backgroundColor: '#111111',
    flex: 1
  }
});

var Main = React.createClass({
  renderScene (route, nav) {
    Router.navigator = nav;
    Router.route = route;
    if (route.id == 'profile') {
      return <Profile nav={nav} route={route}/>;
    } else {
      return (
        <Search nav={nav} route={route}/>
      )
    }
  },
  render(){
    return (
      <View style={styles.tabWrap}>
        <Navigator
          initialRoute={{ message: "First Scene" }}
          renderScene={this.renderScene}
          configureScene={(route) => {
                         if (route.sceneConfig) {
                             return route.sceneConfig;
                         }
                         return Navigator.SceneConfigs.FloatFromRight;
                         }}
          />
      </View>
    )
  }
});

module.exports = Main;