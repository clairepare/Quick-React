import fetch from 'node-fetch';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// Your Firebase configuration (you've shown this before in firebase.js)
const firebaseConfig = {
    apiKey: "AIzaSyA8z7Z8_5VmLGocQqqbSqEqeCqUhhCN4ZM",
    authDomain: "ultimate-scheduling.firebaseapp.com",
    projectId: "ultimate-scheduling",
    storageBucket: "ultimate-scheduling.appspot.com",
    messagingSenderId: "127463614195",
    appId: "1:127463614195:web:921b0d6b29c497438eb986",
    measurementId: "G-7SERH2SVEZ"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

async function storeDataInFirebase() {
  try {
    // Fetch data from the external URL
    const response = await fetch('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
    const data = await response.json();

    // Store data in Firebase
    const dbRef = ref(database, '/courses'); // or any path you prefer

    const adminRef = ref(database, '/admins');

    // Set initial data for /admin path
    set(adminRef, {
        QQUapA1XtETjATKxaEEKS9RiwXa2: true
    });

    await set(dbRef, data);
    
    console.log("Data successfully stored in Firebase!");
  } catch (error) {
    console.error("Error storing data in Firebase:", error);
  }
}

storeDataInFirebase();
