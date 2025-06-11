
import { Link } from 'react-router-dom';
import FortressButton from './ui/Button1';

export default function Navbar() {
  return (
    <nav className="px-6 py-4 shadow flex justify-between items-center">
      <Link to="/home" className="text-2xl font-bold text-brandDark">
        EcomAff
      </Link>
      <div className="flex gap-4">
        <Link to="/home">
          <FortressButton className="bg-primary text-white px-4 py-2 ">Home</FortressButton>
        </Link>
        <Link to="/dashboard">
          <FortressButton className="bg-primary text-white px-4 py-2 ">Dashboard</FortressButton>
        </Link>
        {/* <Link to="/carts">
          <FortressButton className="bg-primary text-white px-4 py-2 ">Carts</FortressButton>
        </Link> */}
        <Link to="/profile">
          <FortressButton className="bg-primary text-white px-4 py-2 ">Profile</FortressButton>
        </Link>
      </div>
    </nav>
  );
}
