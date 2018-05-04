import * as firebase from "firebase";

class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "AIzaSyANOa28LAHBdtYw4TVMzIAClOXmsUyVsY8",
            authDomain: "af2-lists-4a30d.firebaseapp.com",
            databaseURL: "https://af2-lists-4a30d.firebaseio.com",
            storageBucket: "af2-lists-4a30d.appspot.com",
            messagingSenderId: "926990392863",
            projectId: "af2-lists-4a30d"
        });
    }

}
module.exports = Firebase;