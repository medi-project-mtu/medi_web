import firebase from 'firebase';
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "medi-group-project.firebaseapp.com",
    databaseURL: "https://medi-group-project-default-rtdb.firebaseio.com",
    projectId: "medi-group-project",
    storageBucket: "medi-group-project.appspot.com",
    messagingSenderId: "607842716640",
    appId: "1:607842716640:web:65debffb3a7af1f7dcf985",
    measurementId: "G-EPK10H677Z"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.database();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();


const signInWithFacebook = async () => {
  try {
    const res = await auth.signInWithPopup(fbProvider);
    const user = res.user;
    
    await db.ref( "Users/" + user.uid).set ({
      name: user.displayName,
      email: user.email
    });

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const fetchSignInMethod = async (email) => {
    try {
        return await auth.fetchSignInMethodsForEmail(email)
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
}

const signInWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleProvider);
      const user = res.user;

      await db.ref( "Users/" + user.uid).set ({
        name: user.displayName,
        email: user.email
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      user.sendEmailVerification();
      await db.ref( "Users/" + user.uid).set ({
        name: name,
        email: email
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const logout = () => {
auth.signOut();
};

export {
    auth,
    db,
    signInWithGoogle,
    signInWithFacebook,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
    fetchSignInMethod
};