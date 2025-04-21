import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmmIvcfHpOHdJCPmGYtcOlNAK7eRHYNT4",
  authDomain: "mi-proyecto-autos.firebaseapp.com",
  projectId: "mi-proyecto-autos",
  storageBucket: "mi-proyecto-autos.appspot.com",
  messagingSenderId: "778791431123",
  appId: "1:778791431123:web:d628dfb5063724bf649d26"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };