import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsOhNvRnoUF4uDY2y2Cs1yZZ-dnTPzknE",
  authDomain: "riot-e7163.firebaseapp.com",
  projectId: "riot-e7163",
  storageBucket: "riot-e7163.appspot.com",
  messagingSenderId: "897660322615",
  appId: "1:897660322615:web:2b7beb76b249752e1110b2"
};

export const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const storage=getStorage();
export const db=getFirestore(app)