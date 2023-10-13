// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2W4Fmg-bItmNHpCg4bePo1nQQjPSgfLQ",
  authDomain: "plato-49d12.firebaseapp.com",
  projectId: "plato-49d12",
  storageBucket: "plato-49d12.appspot.com",
  messagingSenderId: "395702157219",
  appId: "1:395702157219:web:dc25941c55eba56043e416",
  measurementId: "G-7S4R9R6G5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
const analytics = getAnalytics(app);

//Detect auth state
//onAuthStateChanged(auth, user)