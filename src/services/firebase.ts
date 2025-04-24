import { initializeApp, getApps, FirebaseOptions } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;
// Check if Firebase is already initialized or if the config is invalid
if (!getApps().length && firebaseConfig.apiKey) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

let auth, db;

if (app) {
  auth = getAuth(app);
  db = getFirestore(app);
}

// Export Firebase services
export { db, auth };

export const createUser = async (email: string, password: string) => {
  if (!auth) return null;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
    if (!auth) return null;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    if (!auth) return null;
  return await signOut(auth);
};
