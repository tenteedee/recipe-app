// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'recipe-app-4dc2e.firebaseapp.com',
  projectId: 'recipe-app-4dc2e',
  storageBucket: 'recipe-app-4dc2e.firebasestorage.app',
  messagingSenderId: '1025038259366',
  appId: '1:1025038259366:web:ce9ea4ecbfff72d2615067',
  measurementId: 'G-D56CNE323J',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);
