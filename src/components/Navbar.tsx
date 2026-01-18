import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">💼 Job Portal</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, Applicant</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;