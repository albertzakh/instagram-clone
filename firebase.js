import { initializeApp, getApps, getApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"



const firebaseConfig = {
    apiKey: "AIzaSyBiJPirI9RSJGhGuj3tRetvzgTmRzetvAg",
    authDomain: "instagram-clone-584ef.firebaseapp.com",
    projectId: "instagram-clone-584ef",
    storageBucket: "instagram-clone-584ef.appspot.com",
    messagingSenderId: "539636214282",
    appId: "1:539636214282:web:20e999a4f38cdd126d4df3"
};

// if app is not initialized create it else use it

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };