
'use strict';
require('react-native-browser-polyfill');
var React = require('react-native');
var Router = require('../../../../utils/services/router');
var NavBar = require('../../../navbar/navbar');
var Loading = require('../../../loaders/loadingctrl');
var Parse = require('../../../../utils/services/parse');

var {
  CameraRoll,
  Image,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;
var ImageEditingManager = NativeModules.ImageEditingManager;
var RCTScrollViewConsts = NativeModules.UIManager.RCTScrollView.Constants;



var PAGE_SIZE = 20;

type ImageOffset = {
  x: number;
  y: number;
};

type ImageSize = {
  width: number;
  height: number;
};

type TransformData = {
  offset: ImageOffset;
  size: ImageSize;
}

class SquareImageCropper extends React.Component {
  _isMounted: boolean;
  _transformData: TransformData;

  constructor(props) {
    super(props);
    this._isMounted = true;
    this.state = {
      randomPhoto: Router.route.image.node.image,
      measuredSize: null,
      croppedImageURI: null,
      largeThumbURI: null,
      smallThumbURI:null,
      cropError: null,
      type:Router.route.type
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!this.state.measuredSize) {
      return (

            <View
          style={styles.container}
          onLayout={(event) => {
            var measuredWidth = event.nativeEvent.layout.width;
            if (!measuredWidth) {
              return;
            }
            this.setState({
              measuredSize: {width: measuredWidth, height: measuredWidth},
            });
          }}
        />

      );
    }

    if (!this.state.croppedImageURI) {
      return this._renderImageCropper();
    }
    return this._renderCroppedImage();
  }

  _renderImageCropper() {
    if (!this.state.randomPhoto) {
      return (
        <View style={styles.container} />
      );
    }
    var error = null;
    if (this.state.cropError) {
      error = (
        <Text>{this.state.cropError.message}</Text>
      );
    }
    return (

     <View style={styles.wrapper}>
      <NavBar backBtn={true} fwdBtn={false} logoType={true} transparentBackground={false}/>
      <View style={styles.containerWrap}>

      <View style={styles.container}>
        <ImageCropper
          image={this.state.randomPhoto}
          size={this.state.measuredSize}
          style={[styles.imageCropper, this.state.measuredSize]}
          onTransformDataChange={(data) => this._transformData = data}
        />
        <TouchableHighlight
          style={styles.cropButtonTouchable}
          onPress={this._crop.bind(this)}>
          <View style={styles.cropButton}>
            <Text style={styles.cropButtonLabel}>
              DONE
            </Text>
          </View>
        </TouchableHighlight>
        {error}
      </View>
      </View>
      </View>
    );
  }

  _saveImage(){

    var that = this;
    Loading.show();

    NativeModules.ImageStoreManager.getBase64ForTag(this.state.largeThumbURI,
        function(base64) {

          Parse.saveLargeThumbnailToParse(base64, that.state.type).then(function(largeImageUrl){

            NativeModules.ImageStoreManager.getBase64ForTag(that.state.smallThumbURI,
                function(base64) {

                  Parse.saveSmallThumbnailToParse(base64, that.state.type,largeImageUrl);

                }, function(err){
                });
          });

        }, function(err){

        });
  }

  _renderCroppedImage() {
    return (
        <View style={styles.wrapper}>
          <NavBar backBtn={true} fwdBtn={false} logoType={true} transparentBackground={false}/>
          <View style={styles.containerWrap}>
      <View style={styles.containerCropped}>
        <Image
          source={{uri: this.state.croppedImageURI}}
          style={ {width:320,height:320}}
        />
        <TouchableHighlight
          style={styles.cropButtonTouchable}
          onPress={this._saveImage.bind(this)}>
          <View style={styles.cropButton}>
            <Text style={styles.cropButtonLabel}>
              SAVE
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
            style={styles.resetButtonTouchable}
            onPress={this._reset.bind(this)}>
          <View style={styles.resetButton}>
            <Text style={styles.resetButtonLabel}>
              RESET
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      </View>
      </View>
    );
  }

  _crop() {

    ImageEditingManager.cropImage(
      this.state.randomPhoto.uri,
      this._transformData,
      (croppedImageURI) => {
        this.setState({croppedImageURI});
        var variabx = this._transformData;
        variabx.displaySize = {
          width:640,
          height:640
        };
        ImageEditingManager.cropImage(
            this.state.randomPhoto.uri,
            this._transformData,
            (largeThumbURI) => {

        this.setState({largeThumbURI});
        var variab = this._transformData;
        variab.displaySize = {
          width:240,
          height:240
        };
        ImageEditingManager.cropImage(
            this.state.randomPhoto.uri,
            variab,
            (smallThumbURI) => {
              this.setState({smallThumbURI})
            },
            (cropError) => this.setState({cropError})
        );
            },
            (cropError) => this.setState({cropError})
        );
      },
      (cropError) => this.setState({cropError})
    );
  }

  _reset() {
    this.setState({
      randomPhoto: Router.route.image.node.image,
      croppedImageURI: null,
      cropError: null,
    });
  }

}

class ImageCropper extends React.Component {
  _scaledImageSize: ImageSize;
  _contentOffset: ImageOffset;

  componentWillMount() {
    // Scale an image to the minimum size that is large enough to completely
    // fill the crop box.
    var widthRatio = this.props.image.width / this.props.size.width;
    var heightRatio = this.props.image.height / this.props.size.height;
    if (widthRatio < heightRatio) {
      this._scaledImageSize = {
        width: this.props.size.width,
        height: this.props.image.height / widthRatio,
      };
    } else {
      this._scaledImageSize = {
        width: this.props.image.width / heightRatio,
        height: this.props.size.height,
      };
    }

    this._contentOffset = {
      x: (this._scaledImageSize.width - this.props.size.width) / 2,
      y: (this._scaledImageSize.height - this.props.size.height) / 2,
    };
    this._updateTransformData(
      this._contentOffset,
      this._scaledImageSize,
      this.props.size
    );
  }

  _onScroll(event) {
    this._updateTransformData(
      event.nativeEvent.contentOffset,
      event.nativeEvent.contentSize,
      event.nativeEvent.layoutMeasurement
    );
  }

  _updateTransformData(offset, scaledImageSize, croppedImageSize) {

    console.log(croppedImageSize);

    var offsetRatioX = offset.x / scaledImageSize.width;
    var offsetRatioY = offset.y / scaledImageSize.height;
    var sizeRatioX = croppedImageSize.width / scaledImageSize.width;
    var sizeRatioY = croppedImageSize.height / scaledImageSize.height;

    this.props.onTransformDataChange && this.props.onTransformDataChange({
      offset: {
        x: this.props.image.width * offsetRatioX,
        y: this.props.image.height * offsetRatioY
      },
      size: {
        width: this.props.image.width * sizeRatioX,
        height: this.props.image.height * sizeRatioY
      }
    });
  }

  render() {
    var decelerationRate =
      RCTScrollViewConsts && RCTScrollViewConsts.DecelerationRate ?
        RCTScrollViewConsts.DecelerationRate.Fast :
        0;

    return (

      <ScrollView
        alwaysBounceVertical={true}
        automaticallyAdjustContentInsets={false}
        contentOffset={this._contentOffset}
        decelerationRate={decelerationRate}
        horizontal={true}
        maximumZoomScale={3.0}
        onMomentumScrollEnd={this._onScroll.bind(this)}
        onScrollEndDrag={this._onScroll.bind(this)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.draggableContainer}
        scrollEventThrottle={16}>
        <Image source={this.props.image} style={this._scaledImageSize} />
      </ScrollView>

    );
  }

}

var styles = StyleSheet.create({

  wrapper:{
    flex:1
  },

  containerWrap:{
    paddingTop:0,
    paddingBottom:40,
    paddingLeft:40,
    paddingRight:40,
    backgroundColor:'#111111',
    alignSelf:'center'
  },

  draggableContainer:{
    width:320,
    height:320,
    alignSelf: 'center'

  },

  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  containerCropped:{
    flex: 1,
    alignSelf: 'center',
    justifyContent:'center',
    alignItems:'center'
  },
  imageCropper: {
    alignSelf: 'center',
    marginTop: 12,
  },
  cropButtonTouchable: {
    alignSelf: 'center',
    marginTop: 0,
  },
  cropButton: {
    padding: 12,
    backgroundColor: 'transparent',
    borderRadius: 40,
    width:80,
    height:80,
    borderWidth:1,
    borderColor:'#1c9ee8',
    marginTop:10
  },
  cropButtonLabel: {
    color: 'white',
    fontSize: 16,
    textAlign:'center',
    paddingTop:19,
    fontFamily:'Gotham-Light'
  },
  resetButtonTouchable: {
    alignSelf: 'center',
    position:'absolute',
    right:10,
    marginTop:-60
  },
  resetButton: {
    padding: 12,
    backgroundColor: 'transparent',
    borderRadius: 29,
    width:58,
    height:58,
    borderWidth:1,
    borderColor:'#1c9ee8'
  },
  resetButtonLabel: {
    color: 'white',
    fontSize: 9,
    textAlign:'center',
    paddingTop:11,
    fontFamily:'Gotham-Light'
  }
});


module.exports = SquareImageCropper;
