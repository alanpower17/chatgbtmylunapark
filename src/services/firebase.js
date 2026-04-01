import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRVXc2rCK9zIgIKMitnkdQfqxZXYMcI0w",
  authDomain: "mylunaparkchatgpt.firebaseapp.com",
  projectId: "mylunaparkchatgpt",
  storageBucket: "mylunaparkchatgpt.firebasestorage.app",
  messagingSenderId: "915512401969",
  appId: "1:915512401969:web:919e77a70ba3a9259e3510"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);