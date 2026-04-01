export default function ParkCard({ park }) {
  return (
    <div className="bg-[#0f172a] p-3 rounded">
      <img src={park.image} className="w-full h-40 object-cover" />
      <h3>{park.nome}</h3>
      <p>{park.citta}</p>
    </div>
  );
}