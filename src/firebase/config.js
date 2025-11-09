import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Replace with your actual Firebase config from the console
const firebaseConfig = {
  apiKey: "AIzaSyAdnQKKdZf5FOoZFvamXV4Ic2vA0iyYiEU",
  authDomain: "ecofoot-328a9.firebaseapp.com",
  projectId: "ecofoot-328a9",
  storageBucket: "ecofoot-328a9.firebasestorage.app",
  messagingSenderId: "89139362165",
  appId: "1:89139362165:web:43a2c07c1f43fc15e83b3c",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;