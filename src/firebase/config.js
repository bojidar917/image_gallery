import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBH4UOgLCkgpIgf2BSVviMO9op961NpOYo",
  authDomain: "image-gallery-4296a.firebaseapp.com",
  projectId: "image-gallery-4296a",
  storageBucket: "image-gallery-4296a.appspot.com",
  messagingSenderId: "413075562339",
  appId: "1:413075562339:web:f20e813d5066bacef07d56"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const storage = getStorage(app);

const db = getFirestore(app);

export {auth, storage, db};