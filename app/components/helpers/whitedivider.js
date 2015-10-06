var React = require('react-native');

var {
    View,
    StyleSheet
    } = React;

var styles = StyleSheet.create({

    separator:{
        height:0.5,
        backgroundColor:'white',
        flex: 1
    }

});

class Divider extends React.Component{

    render(){

        return(
            <View style={styles.separator}/>
        )
    }

};

module.exports = Divider;