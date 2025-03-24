import React from 'react';
import { Instagram, Facebook} from 'lucide-react';

function Footer(){
  return (
    <footer className="bg-black text-white py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto max-w-6xl">
      
      <div className="mb-8">
        <h2 id='footer-title' className="text-xl text-center md:text-2xl md:text-left">Shadow & Spirits</h2>
      </div>
      
      {/* Footer Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
        {/* <!-- Contact Column --> */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-medium mb-3">Contact</h3>
          <p className="mb-2"><span className='pr-1'>+65</span>6776 7989</p>
          <p>admin@shadowandspirits.com</p>
        </div>
        
        {/* Address Column */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-medium mb-3">Address</h3>
          <p className="text-center md:text-left">
            3A Burkley Street, #02-01<br />
            Singapore 667890
          </p>
        </div>
        
        {/* Follow Us Column */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-medium mb-3">Follow Us</h3>
          <div className="flex space-x-4">

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              <Instagram size={22} />
            </a>
            
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              <Facebook size={23}/>
            </a>
          </div>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;