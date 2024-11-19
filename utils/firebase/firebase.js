import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
