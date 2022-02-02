import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
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
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const storage = getStorage(app);
