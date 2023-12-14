import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAZnKbllGvOTOqClsDKlYfLtGj4iSshl6k",
    authDomain: "fault-mgr.firebaseapp.com",
    projectId: "fault-mgr",
    storageBucket: "fault-mgr.appspot.com",
    messagingSenderId: "170578870148",
    appId: "1:170578870148:web:8e840ff226c928aaab67d1"
  };

  initializeApp(firebaseConfig)
  const db = getFirestore()
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider()

  export {db, auth, googleProvider}