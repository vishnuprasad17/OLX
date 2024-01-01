import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import 'firebase/auth'
import 'firebase/firestore'
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlFQNybBfamrbWVYm2JQJWaZfAVAPsdag",
  authDomain: "olx-webapp-8c337.firebaseapp.com",
  projectId: "olx-webapp-8c337",
  storageBucket: "olx-webapp-8c337.appspot.com",
  messagingSenderId: "631787867453",
  appId: "1:631787867453:web:05b2461afa128237b6c954",
  measurementId: "G-WJYRF4XR3E"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);