'use strict';

var React = require('react-native');
var Swiper = require('react-native-swiper');

var {
    StyleSheet,
    View,
    Text,
    Component,
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
        backgroundColor: 'rgba(0,0,0,0.6)',
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
    }
});

var Slider = React.createClass({
    render(){

        return(
            <Swiper style={styles.swipperWrap} showsButtons={true} loop={true} showsPagination={false} autoplay={false} autoplayTimeout={4} height={200}>
                <View style={styles.slide}>
                    <Image source={{uri: 'https://yt3.ggpht.com/-HZc8Bqr_g3c/VCRkbmSvlPI/AAAAAAAAAC8/KoYAcAC7uNw/w2120-fcrop64=1,00005a57ffffa5a8-nd/PLAN-B-VEVO-MAIN-BANNER-2.jpg'}} style={styles.image}>
                        <View style={styles.overlay}>
                            <Text style={styles.copyText}>
                                ARTIST ON THE RISE
                            </Text>
                            <Text style={styles.artistTitle}>
                                PLAN B
                            </Text>
                        </View>
                    </Image>
                </View>
                <View style={styles.slide}>
                    <Image source={{uri: 'https://yt3.ggpht.com/-byO3AVvBA-8/UbYX80ThpqI/AAAAAAAAAAw/mOXcMlljaHI/w2120-fcrop64=1,00005a57ffffa5a8-nd/channels4_banner.jpg'}} style={styles.image}>
                        <View style={styles.overlay}>
                            <Text style={styles.copyText}>
                                ARTIST ON THE RISE
                            </Text>
                            <Text style={styles.artistTitle}>
                                PLAN B
                            </Text>
                        </View>
                    </Image>
                </View>
                <View style={styles.slide}>
                    <Image source={{uri: 'https://yt3.ggpht.com/-64n90etqL4o/VUJUj6mpj7I/AAAAAAAAADM/Btkwij677ck/w2120-fcrop64=1,00005a57ffffa5a8-nd/siropeyoutube.jpg'}} style={styles.image}>
                        <View style={styles.overlay}>
                            <Text style={styles.copyText}>
                                ARTIST ON THE RISE
                            </Text>
                            <Text style={styles.artistTitle}>
                                PLAN B
                            </Text>
                        </View>
                    </Image>
                </View>
                <View style={styles.slide}>
                    <Image source={{uri: 'https://yt3.ggpht.com/-64n90etqL4o/VUJUj6mpj7I/AAAAAAAAADM/Btkwij677ck/w2120-fcrop64=1,00005a57ffffa5a8-nd/siropeyoutube.jpg'}} style={styles.image}>
                        <View style={styles.overlay}>
                            <Text style={styles.copyText}>
                                ARTIST ON THE RISE
                            </Text>
                            <Text style={styles.artistTitle}>
                                PLAN B
                            </Text>
                        </View>
                    </Image>
                </View>
            </Swiper>
        )
    }
});

module.exports = Slider;