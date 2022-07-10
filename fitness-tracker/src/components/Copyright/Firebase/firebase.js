// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPtIMMoHcLA_VTgcM19AFJmoGFphYry2g",
    authDomain: "fitness-tracker-c8bbb.firebaseapp.com",
    projectId: "fitness-tracker-c8bbb",
    storageBucket: "fitness-tracker-c8bbb.appspot.com",
    messagingSenderId: "437211037563",
    appId: "1:437211037563:web:4b7f80271545179fd587de",
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        // this.db = app.database(); Later add database
    }

    /*** Authentication  ***/
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
}

export default Firebase;
