import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; 2025 Job Portal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#terms" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;