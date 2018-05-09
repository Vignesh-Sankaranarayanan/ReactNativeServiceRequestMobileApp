import React, { Component } from 'react';

import { StyleSheet, Text, View, Button, Alert ,TextInput} from 'react-native';
import * as firebase from 'firebase';
import { Header } from 'react-native-elements';
import {
  ImageBackground,
  AppRegistry,
} from 'react-native';

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
const remote = 'https://s3.amazonaws.com/documentmisc/vAGZp.jpg';
export default class App extends Component<{}> {
 
  state = {
    text: ''
   
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
    this.setState({text: newText})
  }
  SampleFunction2(StringHolder){
    
    Alert.alert(this._textInput.getNativeProps({text}));
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
  
  userExistsCallback(userId, exists) {
    if (exists) {
      Alert.alert('user ' + userId + ' exists!');
    } else {
      Alert.alert('user ' + userId + ' does not exist!');
    }
  }
  validateEmail = (email) => {
    var re = /^[0-9.,]+$/;
      return re.test(email);
  };
  // Tests to see if /users/<userId> has any data. 
  checkIfUserExists(userId) {
    if (!this.validateEmail(this.state.text)) {
      Alert.alert('user ' + userId + ' is not valid, enter a valid Phonenumber');
      
    } else {
     
      var usersRef = firebase.database().ref("/users/");
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
    
    
  }
  
  render() {
   //source={require('/Users/vigneshsankaranarayanan/Documents/my-project/images/1122287.jpg')}
    return (
      <View style={styles.container}>
 <ImageBackground  style={styles.backgroundImage}>
                <View style={ styles.loginForm }>
                <Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  //statusBarProps={{ barStyle: 'light-content' }}
  centerComponent={{ text: 'Service Requester', style: { color: '#fff' } }}
  outerContainerStyles={{ backgroundColor: '#1d5086' }}
  //innerContainerStyles={{ justifyContent: 'space-around' }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>
                
                <TextInput 
 //style={styles.input}
 ref={component => this._textInput = component}
 style={styles.input}
 multiline={true}

 keyboardType='numeric'
 
 placeholder = "  Enter your Phonenumber  "
 placeholderTextColor = "#000000"
 clearButtonMode="always" 
 maxLength={10} 
 
 onChangeText = {(text)=> this.onChange(text)}
 value = {this.state.text}/>
        <View style={{margin: 2}}>
        <Text style={styles.white} >Click the button to register a service request with the Admin.Admin will give you a callback</Text>
      
       <Button onPress={ this.checkIfUserExists.bind(this, this.state.text) } title=" Click to register a service" />
        
        </View>
        </View>
  
            </ImageBackground>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  white: {
    color: 'white',
  },
  container: {
    flex: 1,
},
backgroundImage: {
    flex: 1
},
loginForm: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
},
  inputContainer: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    height: 20,
    justifyContent: 'center'
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    color:'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    justifyContent: 'center'
  }
});
