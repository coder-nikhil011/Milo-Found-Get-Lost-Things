import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBKXX6q9JGV0oXBAzaX5-fR9RVYrn7kX1c",
  authDomain: "milo-c2d14.firebaseapp.com",
  projectId: "milo-c2d14",
  storageBucket: "milo-c2d14.appspot.com",
  messagingSenderId: "580881876849",
  appId: "1:580881876849:web:7a33ea18421989b210d8d0",
  measurementId: "G-Y4EWZ42533"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;