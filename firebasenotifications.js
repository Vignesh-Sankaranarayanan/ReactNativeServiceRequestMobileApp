import { Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';



const firebaseConfig = {
    apiKey: "AIzaSyANOa28LAHBdtYw4TVMzIAClOXmsUyVsY8",
              authDomain: "af2-lists-4a30d.firebaseapp.com",
              databaseURL: "https://af2-lists-4a30d.firebaseio.com",
              storageBucket: "af2-lists-4a30d.appspot.com",
              messagingSenderId: "926990392863",
              projectId: "af2-lists-4a30d"
  };


export default (async function registerForPushNotificationsAsync() {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();



  userID = firebase.auth().currentUser.uid;

  firebase.database().ref('/users/' + userID).update({ token: token });



  // // POST the token to our backend so we can use it to send pushes from there
  return fetch(PUSH_ENDPOINT, {
     method: 'POST',
    headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       token: {
         value: token,
       },
     }),
   });
});