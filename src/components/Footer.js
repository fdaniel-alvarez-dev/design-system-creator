import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Design System Creator - Freddy Daniel Alvarez - All rights reserved © {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;