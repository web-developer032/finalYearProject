import firebase from "firebase/app";
import "firebase/firebase-firestore";

// ---------------------------
// Enter Your Configuration
// ---------------------------

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
// ---------------------------

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

db.settings({ timestampInSnapshots: true, merge: true });
export const collection = db.collection("your DB collection Name");
