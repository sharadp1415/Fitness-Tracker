// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";
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

// // // Initialize Firebase
// const app = initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig);
        // app.initializeApp(firebaseConfig);
        this.auth = getAuth(app);
        // this.db = app.database(); Later add database
    }

    /*** Authentication  ***/
    doCreateUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(this.auth, email, password);

    doSignInWithEmailAndPassword = (email, password) => {
        console.log("Email: ", email);
        return signInWithEmailAndPassword(this.auth, email, password);
    };

    doSignOut = () => signOut(this.auth);

    doPasswordReset = (email) => sendPasswordResetEmail(this.auth, email);
}

export default Firebase;
