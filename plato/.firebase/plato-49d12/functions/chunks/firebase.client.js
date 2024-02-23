import { getApps, initializeApp, getApp, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC2W4Fmg-bItmNHpCg4bePo1nQQjPSgfLQ",
  authDomain: "plato-49d12.firebaseapp.com",
  projectId: "plato-49d12",
  storageBucket: "plato-49d12.appspot.com",
  messagingSenderId: "395702157219",
  appId: "1:395702157219:web:dc25941c55eba56043e416",
  measurementId: "G-7S4R9R6G5M"
};
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
  deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}
const auth = getAuth(firebaseApp);
const db = getFirestore();
collection(db, "users");
export {
  auth as a,
  db as d
};
