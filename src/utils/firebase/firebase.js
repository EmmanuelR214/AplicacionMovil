// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSXEvTgBNObCzQ4wvTOg7WSLfDIhb5m5Y",
  authDomain: "labarbada-1db65.firebaseapp.com",
  projectId: "labarbada-1db65",
  storageBucket: "labarbada-1db65.appspot.com",
  messagingSenderId: "942890329531",
  appId: "1:942890329531:web:fd663a48b9f37785d1d09e",
  measurementId: "G-X4EJWEVGJC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// const analytics = getAnalytics(app);