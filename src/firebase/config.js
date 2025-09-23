// firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCziSd0HzO6DjLFjDm765OGWfeO5jkLvHA", 
  authDomain: "dailypulse-f7220.firebaseapp.com",
  projectId: "dailypulse-f7220",
  storageBucket: "dailypulse-f7220.firebasestorage.app",
  messagingSenderId: "381053516514",
  appId: "1:381053516514:web:ffde460f60e9f0f1dffcbb",
  measurementId: "G-93VRYRRX8H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;