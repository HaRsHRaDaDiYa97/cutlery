// src/components/Footer.js

import React from 'react';
import { FiMail, FiArrowRight, FiFacebook, FiInstagram } from 'react-icons/fi';

// Helper arrays for links to keep the code clean
const mainMenuLinks = [
  { title: 'Single Name Necklace', href: '#' },
  { title: 'Couple Name Necklace', href: '#' },
  { title: 'Keychain', href: '#' },
  { title: 'Ring', href: '#' },
];

const policiesLinks = [
  { title: 'Terms of Service', href: '#' },
  { title: 'Shipping Policy', href: '#' },
  { title: 'Refund Policy', href: '#' },
  { title: 'Privacy Policy', href: '#' },
  { title: 'Contact Information', href: '#' },
];


const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-6 py-12">
        {/* Main footer content with 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Newsletter */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-light text-gray-800 mb-2">Join our Newsletter</h2>
            <p className="text-sm text-gray-600 mb-4">
              Sign up for our newsletter and get updates on new arrivals
            </p>
            <form className="relative flex items-center">
              <FiMail className="absolute left-3 text-gray-400" />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full h-12 pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button type="submit" className="absolute right-3 text-gray-500 hover:text-gray-800">
                <FiArrowRight className="text-xl" />
              </button>
            </form>
          </div>

          {/* Column 2: Main menu */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Main menu</h3>
            <ul className="space-y-2">
              {mainMenuLinks.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className="text-gray-600 hover:text-black hover:underline">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Policies</h3>
            <ul className="space-y-2">
              {policiesLinks.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className="text-gray-600 hover:text-black hover:underline">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow us</h3>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="p-3 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition-colors">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" aria-label="Instagram" className="p-3 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition-colors">
                <FiInstagram className="text-xl" />
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom copyright section */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Diva Jeweller</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;