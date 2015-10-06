'use strict';

var React = require('react-native');
var NavBar = require('../../../navbar/navbar');
var Router = require('../../../../utils/services/router');

var {
  CameraRoll,
  Image,
  SliderIOS,
  StyleSheet,
  SwitchIOS,
  Text,
  View,
  TouchableOpacity
} = React;

var CameraRollView = require('./CameraRollView');

var CAMERA_ROLL_VIEW = 'camera_roll_view';

var CameraRollExample = React.createClass({

  getInitialState() {
    return {
      groupTypes: 'All',
      sliderValue: 1,
      bigImages: false,
      type:Router.route.type
    };
  },

  render() {
    return (
      <View style={styles.container}>
        <NavBar backBtn={true} fwdBtn={false}  title={this.state.type === 'list'? 'LIST PHOTO':'SELECT AVATAR'} transparentBackground={false}/>
        <CameraRollView
          ref={CAMERA_ROLL_VIEW}
          batchSize={20}
          groupTypes={this.state.groupTypes}
          renderImage={this._renderImage}
        />
      </View>
    );
  },

  loadAsset(image){
     Router.goToSquareImageCropper(image, this.state.type);
  },

  _renderImage(asset) {
    var imageSize = 85;
    var imageStyle = [styles.image, {width: imageSize, height: imageSize}];
    var location = asset.node.location.longitude ?
      JSON.stringify(asset.node.location) : 'Unknown location';
    return (
      <TouchableOpacity onPress={ this.loadAsset.bind( this, asset ) }>
        <View key={asset} style={styles.row}>
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
        </View>
      </TouchableOpacity>
    );
  },

  _onSliderChange(value) {
    var options = CameraRoll.GroupTypesOptions;
    var index = Math.floor(value * options.length * 0.99);
    var groupTypes = options[index];
    if (groupTypes !== this.state.groupTypes) {
      this.setState({groupTypes: groupTypes});
    }
  },

  _onSwitchChange(value) {
    this.refs[CAMERA_ROLL_VIEW].rendererChanged();
    this.setState({ bigImages: value });
  }
});

var styles = StyleSheet.create({
  container:{
    flex:1
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  url: {
    fontSize: 9,
    marginBottom: 14,
  },
  image: {
    margin: 0,
  }
});

module.exports = CameraRollExample;
