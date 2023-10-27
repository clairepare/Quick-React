import { initializeApp } from 'firebase/app';
import { useEffect, useCallback, useState } from 'react';
import { getDatabase, onValue, ref, update} from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signInWithCredential, signOut } from 'firebase/auth';
import { connectAuthEmulator } from "firebase/auth";
import { connectDatabaseEmulator } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8z7Z8_5VmLGocQqqbSqEqeCqUhhCN4ZM",
    authDomain: "ultimate-scheduling.firebaseapp.com",
    projectId: "ultimate-scheduling",
    storageBucket: "ultimate-scheduling.appspot.com",
    messagingSenderId: "127463614195",
    appId: "1:127463614195:web:921b0d6b29c497438eb986",
    measurementId: "G-7SERH2SVEZ"
  };

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithRedirect(auth, new GoogleAuthProvider());
  //signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(auth);

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(auth, setUser)
  ), []);

  return [user];
};

const url =  window.location.href
if(!url.includes("https://ultimate-scheduling.web.app/")) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "qEvli4msW0eDz5mSVO6j3W7i8w1k", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
  ));
  
  // set flag to avoid connecting twice, e.g., because of an editor hot-reload
  globalThis.EMULATION = true;
}

/*console.log("mode: ", import.meta.env.MODE)
if (import.meta.env.NODE_ENV !== 'production'){
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  //console.log("connected")
  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "2Bqd9Ejz9W7gihKsDlb0oup2c1F1", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
  ));
}*/

/*if (!window.EMULATION && import.meta.env.NODE_ENV !== 'production') {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "qEvli4msW0eDz5mSVO6j3W7i8w1k", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
  ));
  
  // set flag to avoid connecting twice, e.g., because of an editor hot-reload
  window.EMULATION = true;
}*/
