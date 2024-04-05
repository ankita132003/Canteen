import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAXyqfih0wzPfOFC_p0SIVnOen2weeVCPQ",
    authDomain: "canteen-1ee58.firebaseapp.com",
    projectId: "canteen-1ee58",
    storageBucket: "canteen-1ee58.appspot.com",
    messagingSenderId: "640000564627",
    appId: "1:640000564627:web:a58b08596e92203e6ddc66",
    measurementId: "G-1P96W180V8"
  };

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREASE_DB = getFirestore(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase