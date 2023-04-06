import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBggOrOrObv-U7J6kixghJwf17LjNV3qAo",
  authDomain: "eshop-25f68.firebaseapp.com",
  projectId: "eshop-25f68",
  storageBucket: "eshop-25f68.appspot.com",
  messagingSenderId: "806837041479",
  appId: "1:806837041479:web:f68ce354ed505243deb462",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
