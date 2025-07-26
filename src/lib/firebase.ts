
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyUcCA3BsQomwlIbhhDujeEgRZ5ZKurC0",
  authDomain: "finwise-57274.firebaseapp.com",
  projectId: "finwise-57274",
  storageBucket: "finwise-57274.firebasestorage.app",
  messagingSenderId: "762760400852",
  appId: "1:762760400852:web:e0dc938836dfe102d85041",
  measurementId: "G-EX15M1JERC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, db, auth, googleProvider };
