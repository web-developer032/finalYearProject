import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/firebase-auth";

// ---------------------------
// Enter Your Configuration
// ---------------------------
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnUnjiMA1vfYGdnz91u4-_A9USHG1HCQM",
  authDomain: "survey-f31f3.firebaseapp.com",
  projectId: "survey-f31f3",
  storageBucket: "survey-f31f3.appspot.com",
  messagingSenderId: "218344279733",
  appId: "1:218344279733:web:3135c2b88c0a4e0d06b8fc",
};
// ---------------------------

// INITIALIZE FIREBASE APP
export const app = firebase.initializeApp(firebaseConfig);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// INITIALIZE FIRESTORE DATABASE
export const db = app.firestore();
db.settings({ timestampInSnapshots: true, merge: true });

// INITIALIZE FIREBASE AUTHENTICATION
export const auth = firebase.auth;

// INITIALIZE FIREBASE FACEBOOK AUTHENTICATION
export const fbAuthProvider = new firebase.auth.FacebookAuthProvider();

// INITIALIZE FIREBASE GOOGLE AUTHENTICATION
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
