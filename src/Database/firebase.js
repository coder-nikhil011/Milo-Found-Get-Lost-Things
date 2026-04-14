// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKXX6q9JGV0oXBAzaX5-fR9RVYrn7kX1c",
  authDomain: "milo-c2d14.firebaseapp.com",
  projectId: "milo-c2d14",
  storageBucket: "milo-c2d14.firebasestorage.app",
  messagingSenderId: "580881876849",
  appId: "1:580881876849:web:7a33ea18421989b210d8d0",
  measurementId: "G-Y4EWZ42533"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);