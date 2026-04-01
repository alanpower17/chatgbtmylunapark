import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import ParkCard from "../components/ParkCard";

export default function Home() {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const snap = await getDocs(collection(db, "LunaParks"));
    setParks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div className="p-4 grid gap-4">
      {parks.map(p => (
        <ParkCard key={p.id} park={p} />
      ))}
    </div>
  );
}