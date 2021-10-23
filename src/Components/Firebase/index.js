import firebase from 'firebase';

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

const addUserDb = async (userDetails, user) => {
  try{
    await db.ref( "Gp/" + user.uid).set ({
      name: userDetails[2],
      email: userDetails[0],
      dob: userDetails[3],
      eirCode: userDetails[4],
      phone: userDetails[5],
      gender: userDetails[6],
      specialization: userDetails[7],
      practice: userDetails[8]
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const fetchSignInMethod = async (email) => {
    try {
        return await auth.fetchSignInMethodsForEmail(email)
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
}

const signInWithProvider = async (provider) => {
    try {
      await auth.signInWithPopup(provider)
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
}

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (userDetails) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(userDetails[0], userDetails[1]);
      const user = res.user;
      user.sendEmailVerification();
      addUserDb(userDetails, user);
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

const fetchUserRole = async (user, type) => {
  let res = false
  try {
      const userRef = db.ref(type + user.uid);
      const snapshot = await userRef.once('value')
      if (snapshot.val() !== null) res = true
  }catch (err) {
    alert(err.message)
  }
  return res
};


const logout = () => {
auth.signOut();
};

export {
    auth,
    db,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
    fetchSignInMethod,
    signInWithProvider,
    googleProvider,
    fbProvider,
    fetchUserRole,
    addUserDb
};