'use strict';

var React = require('react-native');
var Swiper = require('react-native-swiper');
var FirebaseRef = require('../../../utils/services/firebase-ref');
var TitleHelper = require('../../../utils/entrytitle');
var HomeRouter = require('../../../utils/routers/home');

var {
    StyleSheet,
    View,
    Text,
    Component,
    TouchableOpacity,
    ActivityIndicatorIOS,
    Image
    } = React;

var styles = StyleSheet.create({
    swipperWrap: {
        paddingBottom: 0,
        marginBottom: 0
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignItems: 'stretch'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.65)',
        flex: 1,
        justifyContent: 'center'
    },
    copyText: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 18,
        color: '#FFFFFF'
    },
    artistTitle: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 18,
        color: '#FFFFFF'
    },
    image: {
        flex: 1
    },
    loader:{
        paddingTop:10,
        height:49,
        flex:1,
        alignSelf:'center'
    },
    imageWrap:{
        flex:1
    }
});

var Slider = React.createClass({

    getInitialState(){
      return {
          slides: {},
          loading:false,
          slidesLoaded:false
      }
    },
    componentDidMount () {
        this.getBanner()
    },
    getBanner(){
        this.setState({loading:true});
        FirebaseRef.homeBanner().once('value', (banner)=>{
            if(banner.val() !== null){
              this.setState({slides:banner.val(), loading:false, slidesLoaded:true})
            }
        })
    },
    renderSlide(slide){
        return(
          <View style={styles.slide}>
              <TouchableOpacity onPress={() => {HomeRouter.goToProfile(slide.artistId)}} style={styles.imageWrap}>
              <Image source={{uri:slide.bannerUrl}} style={styles.image}>
                  <View style={styles.overlay}>
                      <Text style={styles.copyText}>
                          {slide.awardTitle}
                      </Text>
                      <Text style={styles.artistTitle}>
                          {TitleHelper.getNameUntilComma(slide.artistName)}
                      </Text>
                  </View>
              </Image>
              </TouchableOpacity>
          </View>
        )
    },
    render(){
      if(this.state.slidesLoaded === true){
        return (
            <Swiper style={styles.swipperWrap} showsButtons={true} loop={true} showsPagination={false} autoplay={false} autoplayTimeout={4} height={150}>
                {Object.keys(this.state.slides).map((slide)=> this.renderSlide(this.state.slides[slide]))}
            </Swiper>
        )
      }else{
        return(<ActivityIndicatorIOS hidden='true' size='small' color="#1eaeff" style={styles.loader} />)
      }
    }
});

module.exports = Slider;