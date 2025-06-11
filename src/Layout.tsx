// src/components/Layout.tsx
import { Link, Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
<Navbar />

      <main className="  flex-grow p-6 bg-gray-100">
        {/* Render nested routes here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
