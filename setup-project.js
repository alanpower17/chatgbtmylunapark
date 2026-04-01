const fs = require('fs');
const path = require('path');

const files = {
  // Configurazione Tailwind
  'tailwind.config.js': `export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#020617",
        amber: "#FFBF00",
        neon: "#00FFFF"
      }
    }
  },
  plugins: []
};`,

  // Stili Globali
  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #020617;
  color: #FFBF00;
}`,

  // Firebase Config
  'src/services/firebase.js': `import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
export const auth = getAuth(app);
export const db = getFirestore(app);`,

  // Routing e Protezione (Include Logica Admin/Organizer)
  'src/App.jsx': `import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ParkDetail from "./pages/ParkDetail";
import AdminPanel from "./pages/AdminPanel";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/park/:id" element={<ParkDetail />} />
        
        {/* Route protetta per Admin */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>
        } />
        
        {/* Route protetta per Organizzatori */}
        <Route path="/organizer" element={
          <ProtectedRoute role="organizer"><OrganizerDashboard /></ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
  );
}`,

  // Servizio Sincronizzazione Google Sheets
  'src/services/syncService.js': `import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

export const syncCouponsFromSheet = async (parkId, sheetData) => {
  const existingRef = query(collection(db, "coupons"), where("parkId", "==", parkId));
  const snap = await getDocs(existingRef);
  
  // Rimuove vecchi coupon prima del sync
  snap.forEach(async (d) => await deleteDoc(doc(db, "coupons", d.id)));

  for (const row of sheetData) {
    await addDoc(collection(db, "coupons"), {
      ...row,
      parkId,
      updatedAt: Date.now()
    });
  }
};`,

  // Componente Protezione Accesso
  'src/components/ProtectedRoute.jsx': `import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Caricamento...</div>;
  if (!user || (role && user.role !== role)) return <Navigate to="/login" />;
  return children;
}`
};

// Logica di creazione cartelle e file
Object.keys(files).forEach(filePath => {
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  fs.writeFileSync(filePath, files[filePath]);
  console.log(\`✅ Creato: \${filePath}\`);
});

console.log("\\n🚀 Progetto configurato! Ora puoi caricare la cartella su GitHub.");
