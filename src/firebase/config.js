import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "kinesispro",
  appId: "1:834952766565:web:50415ef6a64a229d61128c",
  storageBucket: "kinesispro.firebasestorage.app",
  apiKey: "AIzaSyDJHWEeJpxSy5U57Rm_WySyS-X4axSgTmk",
  authDomain: "kinesispro.firebaseapp.com",
  messagingSenderId: "834952766565",
  measurementId: "G-864V0SR3SQ"
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (err) {
  console.warn("Firebase initialization notice:", err);
}

export { app, db };

const LOCAL_STORAGE_KEY = 'apexforge_saved_sessions';

// Default mock sessions if no prior data exists
const initialMockSessions = [
  {
    id: 'mock-1',
    exercise_type: 'Squats',
    total_reps: 24,
    calories_burned: 42,
    accuracy_score: 94,
    mistakes_logged: ["Knees slightly inward on rep 18"],
    duration_seconds: 140,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'mock-2',
    exercise_type: 'Bicep Curls',
    total_reps: 30,
    calories_burned: 36,
    accuracy_score: 88,
    mistakes_logged: ["Incomplete extension on rep 12", "Slight elbow swing on rep 22"],
    duration_seconds: 120,
    timestamp: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'mock-3',
    exercise_type: 'Pushups',
    total_reps: 20,
    calories_burned: 55,
    accuracy_score: 96,
    mistakes_logged: [],
    duration_seconds: 90,
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

export async function saveWorkoutSession(sessionData) {
  const sessionRecord = {
    ...sessionData,
    created_at: new Date().toISOString(),
    id: 'session_' + Date.now()
  };

  // 1. Always save to LocalStorage for instant UI responsiveness & offline resilience
  try {
    const cached = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const updated = [sessionRecord, ...cached];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
  } catch (localErr) {
    console.warn("Local storage write error:", localErr);
  }

  // 2. Push to Firestore cloud
  if (db) {
    try {
      const docRef = await addDoc(collection(db, "sessions"), {
        ...sessionRecord,
        timestamp: serverTimestamp()
      });
      console.log("Session saved to Firestore with ID: ", docRef.id);
      return { success: true, id: docRef.id, cloud: true };
    } catch (firebaseErr) {
      console.warn("Firestore sync deferred (using local cache):", firebaseErr.message);
      return { success: true, id: sessionRecord.id, cloud: false, note: "Saved locally" };
    }
  }

  return { success: true, id: sessionRecord.id, cloud: false };
}

export async function getRecentSessions(limitCount = 10) {
  // Try fetching from Firestore first
  if (db) {
    try {
      const q = query(collection(db, "sessions"), orderBy("timestamp", "desc"), limit(limitCount));
      const querySnapshot = await getDocs(q);
      const firestoreData = [];
      querySnapshot.forEach((doc) => {
        firestoreData.push({ id: doc.id, ...doc.data() });
      });

      if (firestoreData.length > 0) {
        return firestoreData;
      }
    } catch (err) {
      console.warn("Firestore query fallback to local cache:", err.message);
    }
  }

  // Fallback to localStorage or mock
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.length > 0) return parsed.slice(0, limitCount);
    }
  } catch (err) {
    console.warn("Failed to read local cache:", err);
  }

  return initialMockSessions.slice(0, limitCount);
}
