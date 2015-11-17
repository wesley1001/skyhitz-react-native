'use strict';

var React = require('react-native');
var Router = require('../../../utils/routers/profile');
var Profile = require('./profile');
var List = require('../../detailviews/list');
var User = require('../../../utils/services/user');

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
    if (route.id == 'list') {
      return <List nav={nav} route={route}/>;
    } else {
      return (
        <Profile nav={nav} route={route} user={User.userData}/>
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