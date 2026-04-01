import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 bg-[#0f172a]">
      <Link to="/" className="text-amber font-bold">
        MyLunaPark
      </Link>
      <Link to="/login">Login</Link>
    </div>
  );
}