import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../app-routes/constants';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <NavLink to={ROUTES.HOME} className="text-2xl font-bold">💼 Job Portal</NavLink>
          <div className="hidden md:flex gap-4">
            {/* <NavLink to={ROUTES.HOME} className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-400' : 'hover:text-blue-300'}`}>Apply</NavLink> */}
            <NavLink to={ROUTES.CAREER} className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-400' : 'hover:text-blue-300'}`}>Careers</NavLink>
            <NavLink to={ROUTES.ADMIN_JOBS} className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-400' : 'hover:text-blue-300'}`}>Admin Panel</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;