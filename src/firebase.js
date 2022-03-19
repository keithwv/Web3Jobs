import * as firebase from "firebase/app";
import { getFirestore, exists } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGppQCrBhFtLxYveQ34D63ZNc8lQNYkfw",
  authDomain: "web3jobmarket.firebaseapp.com",
  projectId: "web3jobmarket",
  storageBucket: "web3jobmarket.appspot.com",
  messagingSenderId: "216122233533",
  appId: "1:216122233533:web:8398bcb540835bdbc91dd4",
  measurementId: "G-M32QT170YT",
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);

export { app };
