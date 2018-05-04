import React, { Component } from 'react';
import registerForPushNotificationsAsync from 'registerForPushNotificationsAsync';
import { StyleSheet, Text, View, Button, Alert ,TextInput} from 'react-native';
import * as firebase from 'firebase'

//var USERS_LOCATION = 'https://af2-lists-4a30d.firebaseio.com/users';
const firebaseConfig = {
  apiKey: "AIzaSyANOa28LAHBdtYw4TVMzIAClOXmsUyVsY8",
            authDomain: "af2-lists-4a30d.firebaseapp.com",
            databaseURL: "https://af2-lists-4a30d.firebaseio.com",
            storageBucket: "af2-lists-4a30d.appspot.com",
            messagingSenderId: "926990392863",
            projectId: "af2-lists-4a30d"
};
firebase.initializeApp(firebaseConfig);

export default class App extends Component<{}> {
 
  state = {
    phonenumber: ''
   
 }
 
  // Initialize Firebase
  
  
  
  SampleFunction1(){
 
    Alert.alert("Function Without Argument");
    
  }
  setupHighscoreListener(userId) {
    firebase.database().ref('users/' + userId).on('value', (snapshot) => {
      const highscore = snapshot.val().highscore;
      console.log("New high score: " + highscore);
    });
  }
   onChange(text) {
    let newText = '';
    let numbers = '0123456789';
  
    for (var i = 0; i < text.length; i++) {
        if ( numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }   
    this.setState({phonenumber: newText})
  }
  SampleFunction2(StringHolder){
    
    Alert.alert(this.state.phonenumber);
    firebase.initializeApp(firebaseConfig);
    
    this.storeHighScore(this.state.phonenumber,1);
  }
   storeHighScore(userId) {
  this.setState(userId);
        firebase.database().ref('users/' + userId).set({
          status: 'open',
          id:userId
        
     
  });
  
      
 
    
  }
  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  _handleNotification = (notification) => {
    this.userID = this.state.phonenumber;
    this.props.navigation.navigate('Notifications');
    this.setState({ notification: notification });

    firebase.database().ref('users/' + this.userID + '/notifications').push(notification.data);
  };


  userExistsCallback(userId, exists) {
    if (exists) {
      Alert.alert('user ' + userId + ' exists!');
    } else {
      Alert.alert('user ' + userId + ' does not exist!');
    }
  }
  
  // Tests to see if /users/<userId> has any data. 
  checkIfUserExists(userId) {
    var usersRef = firebase.database().ref("/users/");
    registerForPushNotificationsAsync();
    usersRef.child(userId).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      if(!exists){
        firebase.database().ref('users/' + userId).set({
          status: 'open',
          id:userId
     
  });
  Alert.alert("Request is added, you will receive call : "+userId);
  
      }
      else{
        Alert.alert("Request exists.So please wait for the call from Admin");
      }
    });
    
  }
  
  render() {
    return (
      <View style={styles.container}>
 
 <TextInput 
 style={styles.textInput}
 keyboardType='numeric'
 underlineColorAndroid = "transparent"
 placeholder = "Enter your Phonenumber"
 placeholderTextColor = "#9a73ef"
 maxLength={10} 
 onChangeText = {(text)=> this.onChange(text)}
 value = {this.state.phonenumber}/>
        <View style={{margin: 10}}>
        <Text>Click the button to register a service request with the Admin.Admin will give you a callback</Text>
      
       <Button onPress={ this.checkIfUserExists.bind(this, this.state.phonenumber) } title=" Click to register a service" />
 
        </View>
       
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
    margin: 10
  }
});
