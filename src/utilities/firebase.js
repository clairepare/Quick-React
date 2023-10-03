import { initializeApp } from 'firebase/app';
import { useEffect, useCallback, useState } from 'react';
import { getDatabase, onValue, ref, update} from 'firebase/database';

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