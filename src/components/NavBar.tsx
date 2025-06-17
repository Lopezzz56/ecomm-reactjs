import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import FortressButton from './ui/Button1';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="z-50 px-6 py-4 shadow flex justify-between items-center bg-white">
      <Link to="/home" className="text-2xl font-bold text-brandDark">
        EcomAff
      </Link>

      {/* Hamburger menu icon */}
      <div className="lg:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:flex gap-4">
        <Link to="/home">
          <FortressButton className="bg-primary text-white px-4 py-2">Home</FortressButton>
        </Link>
        <Link to="/dashboard">
          <FortressButton className="bg-primary text-white px-4 py-2">Dashboard</FortressButton>
        </Link>
        <Link to="/profile">
          <FortressButton className="bg-primary text-white px-4 py-2">Profile</FortressButton>
        </Link>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full flex flex-col items-center gap-4 bg-white p-4 shadow-lg lg:hidden">
          <Link to="/home" onClick={() => setMenuOpen(false)}>
            <FortressButton className="bg-primary text-white w-full">Home</FortressButton>
          </Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            <FortressButton className="bg-primary text-white w-full">Dashboard</FortressButton>
          </Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            <FortressButton className="bg-primary text-white w-full">Profile</FortressButton>
          </Link>
        </div>
      )}
    </nav>
  );
}
