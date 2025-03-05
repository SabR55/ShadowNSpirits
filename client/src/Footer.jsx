import React from 'react';

function Footer(){
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;