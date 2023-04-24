// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAtH0a9kcx878prxk8tRw2hIwCXNVSKG0Q",

  authDomain: "photo-f97de.firebaseapp.com",

  projectId: "photo-f97de",

  storageBucket: "photo-f97de.appspot.com",

  messagingSenderId: "932837264824",

  appId: "1:932837264824:web:d784d03484d3096e6cd34d",

  databaseURL : "https://photo-f97de-default-rtdb.europe-west1.firebasedatabase.app/",

  storageBucket :  "gs://photo-f97de.appspot.com"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app)
