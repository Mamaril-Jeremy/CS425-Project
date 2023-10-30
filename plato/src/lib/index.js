import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC2W4Fmg-bItmNHpCg4bePo1nQQjPSgfLQ",
    authDomain: "plato-49d12.firebaseapp.com",
    projectId: "plato-49d12",
    storageBucket: "plato-49d12.appspot.com",
    messagingSenderId: "395702157219",
    appId: "1:395702157219:web:dc25941c55eba56043e416",
    measurementId: "G-7S4R9R6G5M"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);