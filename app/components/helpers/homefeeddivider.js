var React = require('react-native');

var {
    View,
    StyleSheet
    } = React;

var styles = StyleSheet.create({

    separator:{
        height:0.5,
        backgroundColor:'#dbdbdb',
        flex: 1,
        marginLeft:50
    }

});

class HomeFeedDivider extends React.Component{

    render(){

        return(
            <View style={styles.separator}/>
        )
    }

}

module.exports = HomeFeedDivider;