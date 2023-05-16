import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCfnuCvw4gCzUryaff6K0iHI6KAdoMFOHw",
    authDomain: "foodblog-login.firebaseapp.com",
    projectId: "foodblog-login",
    storageBucket: "foodblog-login.appspot.com",
    messagingSenderId: "995982326503",
    appId: "1:995982326503:web:abf8310c50c2cd74be4042",
    measurementId: "G-2WQW3ZYH0K"
  };

  firebase.initializeApp(firebaseConfig);

  
// Export the firebase instance
export default firebase;