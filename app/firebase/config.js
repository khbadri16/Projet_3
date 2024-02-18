import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import "firebase/firestore";
import "firebase/auth";
import firebase from "firebase/app";
import { getFirestore, getDoc, getDocs } from "firebase/firestore";
import { collection, query, where, limit } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

/**
 *
 *
 * @param {string} username
 * @returns {Promise<object>}
 */
export async function getUserWithUsername(username) {
  try {
    if (!username) {
      console.log("Username is undefined or null");
      return null;
    }

    const usersCollection = collection(db, "users");
    const q = query(
      usersCollection,
      where("username", "==", username),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];

    if (userDoc) {
      return userDoc;
    } else {
      //console.log("No user found for username:", username);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

/**
 * Converts a firestore document to JSON
 * @param  {firebase.firestore.DocumentSnapshot} doc
 * @returns {Object} JSON representation of the document
 */
export function postToJSON(doc) {
  if (!doc.exists) {
    return null;
  }

  const data = doc.data();
  const jsonData = {
    ...data,
    // Convert Firestore Timestamp to milliseconds
    createdAt: data?.createdAt?.toMillis ? data.createdAt.toMillis() : 0,
    updatedAt: data?.updatedAt?.toMillis ? data.updatedAt.toMillis() : 0,
  };

  return jsonData;
}
