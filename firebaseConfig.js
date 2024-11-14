// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXncuOvMrOWbIhvaB75rGUdrn5KZtK1jk",
  authDomain: "comida-peruana-cvi.firebaseapp.com",
  projectId: "comida-peruana-cvi",
  storageBucket: "comida-peruana-cvi.appspot.com",
  messagingSenderId: "937627380400",
  appId: "1:937627380400:web:3e37d4b5dd420a0a8d6975",
  measurementId: "G-GNSRG6CQG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);