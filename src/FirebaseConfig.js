// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAQxHlYQs-v7CuHZGtsSfoEEXI1DOj76uA',
  authDomain: 'pteracup-firebase.firebaseapp.com',
  projectId: 'pteracup-firebase',
  storageBucket: 'pteracup-firebase.appspot.com',
  messagingSenderId: '358281725864',
  appId: '1:358281725864:web:efaa83513da314c4a47f9d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
