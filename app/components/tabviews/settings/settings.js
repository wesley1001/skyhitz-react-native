'use strict';

var React = require('react-native');
var NavBar = require('../../navbar/navbar');
var Router = require('../../../utils/services/router');
var User = require('../../../utils/services/user');
var Username = require('../../../utils/services/username');
var Stripe = require('../../../utils/services/stripe');
var FirebaseRef = require('../../../utils/services/firebase-ref');
var Loading = require('../../loaders/loadingctrl');

var {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    NativeModules,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    SwitchIOS,
    AlertIOS,
    Component
    } = React;

var styles = StyleSheet.create({
    description:{
        fontSize:20,
        textAlign:'center',
        color:'black'
    },
    container:{
        flex:1,
        backgroundColor:'#111111'
    },
    contentContainer:{
        backgroundColor:'white'
    },
    outerWrap:{
        flex:1,
        backgroundColor:'white'
    },
    pageWrap:{
        paddingLeft:10,
        paddingRight:10,
        flex:1
    },
    topHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20,
        marginBottom:20
    },
    leftSection:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        marginRight:20
    },
    profilePic:{
        width: 60,
        height: 60,
        borderRadius:30,
        marginBottom:13
    },
    rightSection: {
        flex:1
    },
    infoHeader:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    settingsDivider:{
        flex:1,
        height:0.5,
        backgroundColor:'#dbdbdb',
        marginTop:5,
        marginBottom:5
    },
    infoSection:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        flex:1
    },
    personalInfoEdit:{
        color:'#1eaeff',
        fontFamily:'Gotham-Book',
        fontSize:11,
        textAlign:'right'
    },
    name:{
        fontFamily:'Avenir',
        fontSize:10,
        marginTop:5,
        marginBottom:5,
        color:'black',
        width:200,
        height:15
    },
    textEdit:{
        color:'#1eaeff',
        fontFamily:'Gotham-Book',
        fontSize:11,
        textAlign:'right',
        flex:1
    },
    sendStripeInfo:{
        color:'#1eaeff',
        fontFamily:'Gotham-Book',
        fontSize:11,
        textAlign:'center',
        flex:1,
        marginTop:20,
        marginBottom:10
    },
    personalInfo:{
        fontFamily:'Avenir',
        fontSize:12,
        flex:1
    },
    billingSection:{
        marginBottom:20,
        flex:1
    },
    stripeAccountSection:{
        marginBottom:50,
        flex:1
    },
    cardNumber:{
        borderWidth:0.5,
        borderColor:'#1DADFF',
        height:20,
        flex:1,
        borderRadius:4,
        fontFamily:'Avenir',
        fontSize:10,
        paddingLeft:10,
        marginTop:10
    },
    wrapRow:{
        flex:1
    },
    dropWrap:{
        width:100,
        position:'absolute',
        backgroundColor:'#e1e1e1',
        borderRadius:4
    },
    pointsSection:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderTopWidth:0.5,
        paddingBottom:5,
        paddingTop:5,
        borderColor:'#dbdbdb',
        marginBottom:30,
        height:50
    },
    wrapInfo:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        flex:1,
        marginTop:10,
        flexWrap:'nowrap'
    },
    pointsText:{
        fontFamily:'Avenir',
        fontSize:12,
        color:'#898A8A'
    },
    availablePoints:{
        fontFamily:'Avenir',
        fontSize:12,
        color:'#1DADFF',
        textAlign:'center',
        alignSelf:'center',
        paddingTop:10,
        paddingBottom:10
    },
    cardLeftSection:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        flex:1
    },
    cardRightSection:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        flex:1
    },
    month:{
        width:60,
        height:20,
        borderWidth:0.5,
        borderColor:'#1DADFF',
        marginRight:10,
        borderRadius:4,
        fontFamily:'Avenir',
        fontSize:10,
        paddingLeft:10
    },
    year:{
        width:60,
        borderWidth:0.5,
        borderColor:'#1DADFF',
        marginRight:10,
        borderRadius:4,
        fontFamily:'Avenir',
        fontSize:10,
        paddingLeft:10
    },
    cvvcode:{
        width:80,
        borderWidth:0.5,
        borderColor:'#1DADFF',
        height:20,
        borderRadius:4,
        fontFamily:'Avenir',
        fontSize:10,
        paddingLeft:10
    },
    addPointsBtn:{
        height:30,
        flex:1,
        borderRadius:4,
        backgroundColor:'#1DADFF',
        marginTop:20,
        paddingTop:8,
        marginBottom:10
    },
    cashOutBtn:{
        height:30,
        flex:1,
        borderRadius:4,
        backgroundColor:'#1DADFF',
        marginTop:20,
        paddingTop:8,
        marginBottom:60
    },
    addPointsText:{
        fontFamily:'Avenir',
        fontSize:14,
        color:'white',
        textAlign:'center'
    },
    switchWrap:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:40,
        flex:1,
        marginTop:20
    }
});

var Settings = React.createClass({
    getInitialState(){
        return {
            personalInfoEdit:false,
            billingInfoEdit:false,
            bankInfoEdit: false,
            name:User.userData.name,
            username:User.userData.username,
            email:User.userData.email,
            userPoints:User.userData.points,
            cardNumber:User.userData.stripeCard ? 'xxxxxxxxxxxx'+User.userData.stripeCard.last4:'',
            expirationMonth:User.userData.stripeCard ? 'xx':'',
            expirationYear:User.userData.stripeCard ? User.userData.stripeCard.exp_year:'',
            cvc:User.userData.stripeCard ? 'xxx' : '',
            accountNumber:'',
            routingNumber:'',
            taxId:'',
            trueSwitchIsOn: false,
            promptValue:'10',
            promptTitle:'How many Skyhitz points would you like to add to your account? 1 USD = 1 POINT.',
            cashOutPromptTitle:'How many Skyhitz points would you like to transfer to your Stripe account?'
        }
    },
    enablePersonalInfoEdit(){
        this.setState({personalInfoEdit:true});
    },
    savePersonalInfo(){
        var that = this;
        Loading.show();
        FirebaseRef.userName(User.getUid()).set(that.state.name,function(error){
            if(error){
                Loading.hide();
                AlertIOS.alert(
                    null,
                    error.message
                )
            }else {
                FirebaseRef.userEmail(User.getUid()).set(that.state.email,function(error){
                    if(error){
                        Loading.hide();
                        AlertIOS.alert(
                            null,
                            error.message
                        )
                    }else {
                        Username.username = that.state.username;
                        if(User.userData.username !== that.state.username){
                        if(that.state.username == ''){
                            Loading.hide();
                            AlertIOS.alert(
                                null,
                                'Please pick a username.'
                            )
                        } else if (/\s/.test(that.state.username)){
                            Loading.hide();
                            AlertIOS.alert(
                                null,
                                "Make sure your username doesn't contain whitespace."
                            )
                        } else {
                            Username.checkIfYoutubeUsernameIsTaken().then(function () {
                                that.setState({personalInfoEdit: false});
                            })
                        }
                        }else{
                            Loading.hide();
                            that.setState({personalInfoEdit:false});
                        }
                    }
                });
            }
        });
    },
    enableBillingInfoEdit(){
        this.setState({
            billingInfoEdit:true,
            cardNumber:'',
            expirationMonth:'',
            expirationYear:'',
            cvc:''
        });
    },
    saveBillingInfo(){
        var that = this;
        if(this.state.cardNumber == ''){
            AlertIOS.alert(
                null,
                'Please enter a card number.'
            )
        } else if (this.state.expirationMonth == ''){
            AlertIOS.alert(
                null,
                "Please enter a two digit number expiration month. (MM)"
            )
        } else if (this.state.expirationYear == '') {
            AlertIOS.alert(
                null,
                "Please enter a four digit number expiration year. (YYYY)"
            )
        } else if (this.state.cvc == '') {
            AlertIOS.alert(
                null,
                "Please enter your cvc code. The last 3 digits at the back of your card."
            )
        } else {
            NativeModules.ReactStripe.getCardToken(this.state.cardNumber, this.state.expirationMonth, this.state.expirationYear, this.state.cvc,
                function(error){
                    if(error == "Your card's expiration month is invalid"){
                        // TODO set field color to red
                    }else if(error == "Your card's expiration year is invalid"){
                        // TODO set field color to red
                    }
                    AlertIOS.alert(
                        null,
                        error
                    )
                },
                function(token){
                    if(User.userData.hasOwnProperty('stripeUid')){
                        Stripe.addCard(token);
                    }else{
                        Stripe.createCustomer(token);
                    }
                    that.setState({billingInfoEdit: false});
                }
            );
        }
    },
    prompt() {
        if(User.userData.hasOwnProperty('stripeUid')){
            AlertIOS.prompt(this.state.promptTitle,this.state.promptValue, this.promptResponse);
        }else{
            AlertIOS.alert(
                null,
                "Please enter a valid card."
            )
        }
    },
    promptResponse(promptValue) {
        if(promptValue > 500){
            AlertIOS.alert(
                null,
                "You can only add a maximum of 500 points per day."
            )
        }else{
            AlertIOS.alert(
                null,
                "You card will be charged $"+promptValue+ " USD.",
                [
                    {text: 'Cancel', onPress: () => console.log('cancelled')},
                    {text: 'Confirm', onPress: () => this.confirmPayment(promptValue)}
                ]
            )
        }
        this.setState({ promptValue });
    },
    confirmPayment(promptValue){
        var that = this;
        Stripe.chargeCustomer(promptValue).then(function(points){
            that.setState({userPoints:points});
        });
    },
    cashOutPromptResponse(promptValue){
        var skyhitzFee = promptValue * 0.10;
        if(promptValue > User.userData.points){
            AlertIOS.alert(
                null,
                "You can't cash out more than " + User.userData.points +" Skyhitz points."
            )
        }else{
            AlertIOS.alert(
                null,
                "You will be paying an application fee of "+skyhitzFee+ " USD. (10%)",
                [
                    {text: 'Cancel', onPress: () => console.log('cancelled')},
                    {text: 'Confirm', onPress: () => this.confirmCashOut(promptValue - skyhitzFee)}
                ]
            )
        }
    },
    confirmCashOut(amount){
        var that = this;
        Stripe.cashOut(amount).then(function(points){
            that.setState({userPoints:points});
        });
    },
    cashOut(){
        AlertIOS.prompt(this.state.cashOutPromptTitle, this.state.cashOutPromptValue, this.cashOutPromptResponse);
    },
    renderPersonalEditBtn(){
        if(this.state.personalInfoEdit === true){
            return(<TouchableOpacity onPress={this.savePersonalInfo} ><Text style={styles.personalInfoEdit}>SAVE</Text></TouchableOpacity>)
        }else{
            return(<TouchableOpacity onPress={this.enablePersonalInfoEdit}><Text style={styles.personalInfoEdit}>EDIT</Text></TouchableOpacity>)
        }
    },
    renderBillingEditBtn(){
        if(this.state.billingInfoEdit === true){
            return(<TouchableOpacity onPress={this.saveBillingInfo}><Text style={styles.textEdit}>SAVE</Text></TouchableOpacity>)
        }else{
            return(<TouchableOpacity onPress={this.enableBillingInfoEdit}><Text style={styles.textEdit}>EDIT</Text></TouchableOpacity>)
        }
    },
    sendStripeEmail(){
        Loading.show();
        Stripe.createStandaloneAccount({
            managed: false,
            country: 'US',
            email: User.userData.email,
            uid: User.getUid()
        });
    },
    renderCashOutBtn(){
        if(User.userData.hasOwnProperty('stripeAccountUid')){
        return (
            <TouchableHighlight style={styles.cashOutBtn} onPress={this.cashOut}>
                <Text style={styles.addPointsText}>CASH OUT TO STRIPE ACCOUNT</Text>
            </TouchableHighlight>
        )
        }else{
            return (
                <TouchableOpacity><Text style={styles.sendStripeInfo} onPress={this.sendStripeEmail}>Send me an e-mail to create a Stripe Account</Text></TouchableOpacity>
            )
        }
    },
    render(){
        return(
            <View style={styles.container}>
                <NavBar backBtn={false} fwdBtn={false} logoType={true} transparentBackground={false}/>
                <View style={styles.outerWrap}>
                <ScrollView automaticallyAdjustContentInsets={false} contentContainerStyle={styles.contentContainer}>
                <View style={styles.pageWrap}>
                <View style={styles.topHeader}>
                    <View style={styles.leftSection}>
                        <Image style={styles.profilePic} source={User.userData.smallAvatarUrl == "placeholder" ? require('image!avatar'):{uri:User.userData.smallAvatarUrl}}/>
                        <TouchableOpacity onPress={()=>Router.goToEditAvatar('profile')}><Text style={styles.textEdit}>EDIT</Text></TouchableOpacity>
                    </View>
                    <View style={styles.rightSection}>
                        <View style={styles.infoHeader}>
                            <Text style={styles.personalInfo}>PERSONAL INFO</Text>
                            {this.renderPersonalEditBtn()}
                        </View>
                        <View style={styles.settingsDivider}></View>
                        <View style={styles.infoSection}>
                            <Image style={styles.personIcon} />
                            <TextInput
                                autoCapitalize="none"
                                placeholder="Name"
                                clearButtonMode="while-editing"
                                autoCorrect={false}
                                keyboardType="default"
                                editable={this.state.personalInfoEdit}
                                style={styles.name}
                                placeholderTextColor="#626363"
                                value={this.state.name}
                                onChangeText={(text) => {
                                this.setState({name:text});
                                 }}
                                />
                        </View>
                        <View style={styles.infoSection}>
                            <Image style={styles.personIcon} />
                            <TextInput
                                autoCapitalize="none"
                                placeholder="Username"
                                clearButtonMode="while-editing"
                                autoCorrect={false}
                                keyboardType="default"
                                editable={this.state.personalInfoEdit}
                                style={styles.name}
                                placeholderTextColor="#626363"
                                value={this.state.username}
                                onChangeText={(text) => {
                                this.setState({username:text});
                                 }}
                                />
                        </View>
                        <View style={styles.infoSection}>
                            <Image style={styles.emailIcon} />
                            <TextInput
                                autoCapitalize="none"
                                placeholder="Email"
                                clearButtonMode="while-editing"
                                autoCorrect={false}
                                keyboardType="email-address"
                                editable={this.state.personalInfoEdit}
                                style={styles.name}
                                placeholderTextColor="#626363"
                                value={this.state.email}
                                onChangeText={(text) => {
                                this.setState({email:text});
                                 }}
                                />
                        </View>
                    </View>
                </View>
                <View style={styles.pointsSection}>
                    <View style={styles.available}>
                    <Text style={styles.pointsText}>AVAILABLE SKYHITZ POINTS</Text>
                    </View>
                    <View style={styles.availablePointsSection}>
                        <Text style={styles.availablePoints}>{this.state.userPoints} PTS</Text>
                    </View>
                </View>
                <View style={styles.billingSection}>
                    <View style={styles.infoHeader}>
                        <Text style={styles.personalInfo}>BILLING INFO</Text>
                        {this.renderBillingEditBtn()}
                    </View>
                    <View style={styles.settingsDivider}></View>
                    <View style={styles.wrapRow}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="CARD NUMBER"
                        autoCorrect={false}
                        keyboardType="numeric"
                        editable={this.state.billingInfoEdit}
                        style={styles.cardNumber}
                        placeholderTextColor="#626363"
                        secureTextEntry={!this.state.billingInfoEdit}
                        value={this.state.cardNumber}
                        maxLength={16}
                        onChangeText={(text) => {
                        this.setState({cardNumber:text});
                        }}
                        />
                    </View>
                    <View style={styles.wrapInfo}>
                            <View style={styles.cardLeftSection}>
                            <TextInput
                                autoCapitalize="none"
                                placeholder="MONTH"
                                keyboardType="numeric"
                                editable={this.state.billingInfoEdit}
                                autoCorrect={false}
                                style={styles.month}
                                placeholderTextColor="#626363"
                                secureTextEntry={!this.state.billingInfoEdit}
                                maxLength={2}
                                value={this.state.expirationMonth.toString()}
                                onChangeText={(text) => {
                        this.setState({expirationMonth:text});
                        }} />
                            <TextInput
                                autoCapitalize="none"
                                placeholder="YEAR"
                                keyboardType="numeric"
                                autoCorrect={false}
                                editable={this.state.billingInfoEdit}
                                style={styles.year}
                                placeholderTextColor="#626363"
                                secureTextEntry={!this.state.billingInfoEdit}
                                maxLength={4}
                                value={this.state.expirationYear.toString()}
                                onChangeText={(text) => {
                        this.setState({expirationYear:text});
                        }} />
                            </View>
                            <View style={styles.cardRightSection}>
                            <TextInput
                                autoCapitalize="none"
                                placeholder="CVV CODE"
                                keyboardType="numeric"
                                editable={this.state.billingInfoEdit}
                                autoCorrect={false}
                                style={styles.cvvcode}
                                placeholderTextColor="#626363"
                                secureTextEntry={!this.state.billingInfoEdit}
                                maxLength={3}
                                value={this.state.cvc}
                                onChangeText={(text) => {
                        this.setState({cvc:text});
                        }}/>
                              </View>
                    </View>
                    <TouchableHighlight style={styles.addPointsBtn} onPress={this.prompt}>
                        <Text style={styles.addPointsText}>ADD POINTS</Text>
                    </TouchableHighlight>
                </View>
                    <View style={styles.stripeAccountSection}>
                        <View style={styles.infoHeader}>
                            <Text style={styles.personalInfo}>CREATE STRIPE ACCOUNT</Text>
                        </View>
                        <View style={styles.settingsDivider}></View>
                        <View style={styles.wrapRow}>
                            <View style={styles.switchWrap}>
                                <Text style={styles.personalInfo}>In order to withdraw your points you will have to create a verified Stripe Account. Verify that your current email is up to date.</Text>
                            </View>
                            {this.renderCashOutBtn()}
                        </View>
                    </View>
               </View>
                </ScrollView>
                </View>
            </View>
        )
    }
});

module.exports = Settings;
