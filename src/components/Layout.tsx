import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;