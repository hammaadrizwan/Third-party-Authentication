// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRzpqvYoRbVVOhfGFcUujkEc8lEAnoGAg",
  authDomain: "marketwiz-90df4.firebaseapp.com",
  projectId: "marketwiz-90df4",
  storageBucket: "marketwiz-90df4.appspot.com",
  messagingSenderId: "182502739522",
  appId: "1:182502739522:web:fd90c7fabe8e1f453427db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);