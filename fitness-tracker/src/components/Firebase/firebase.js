// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";
import { getDatabase, ref, set, child, push } from "firebase/database";
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
        this.db = getDatabase(app);
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

    addUser = (uid, name, email) => {
        return set(ref(this.db, `users/${uid}`), {
            username: name,
            email: email,
            activities: "not set",
        });
    };
    users = () => this.db.ref("users");

    addActivity = (uid, activity) => {
        // const ref = this.db.ref().child(`users/${uid}/activities`);
        const reference = child(ref(this.db), `users/${uid}/activities`);
        push(reference, activity);
    };

    // updateActivity = (uid, activity, activityKey) => {
    //     const ref = this.db
    //         .ref()
    //         .child(`users/${uid}/activities/${activityKey}`);
    //     ref.update(activity);
    // };
}

export default Firebase;
