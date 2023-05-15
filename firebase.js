// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA52Vuy9da1DSBWRm27BnLpnPh-_gem6UM",
  authDomain: "photoa-e049d.firebaseapp.com",
  projectId: "photoa-e049d",
  storageBucket: "photoa-e049d.appspot.com",
  messagingSenderId: "357499423878",
  appId: "1:357499423878:web:b0f175b82c4cf3461ed507"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app)
