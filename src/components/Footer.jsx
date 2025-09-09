import React from "react";
import { FiMail, FiArrowRight, FiFacebook, FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";

// Helper arrays for links
const mainMenuLinks = [
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
  { name: "Contact Us", to: "/contact" },
  { name: "About Us", to: "/about" },
];

const policiesLinks = [
  { name: "Terms of Service", to: "/terms" },
  { name: "Shipping Policy", to: "/shipping" },
  { name: "Refund Policy", to: "/refund" },
  { name: "Privacy Policy", to: "/privacy" },

];

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-6 py-12">
        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1: Newsletter */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-light text-gray-800 mb-2">
              Join our Newsletter
            </h2>
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
              <button
                type="submit"
                className="absolute right-3 text-gray-500 hover:text-gray-800"
              >
                <FiArrowRight className="text-xl" />
              </button>
            </form>
          </div>

          {/* Column 2: Main menu */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Main menu</h3>
            <ul className="space-y-2">
              {mainMenuLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="relative text-gray-600 hover:text-black transition-colors duration-300
             after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 
             after:bg-black hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </Link>


                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Policies</h3>
            <ul className="space-y-2">
              {policiesLinks.map((link) => (
                <li key={link.name}>
                   <Link
                    to={link.to}
                    className="relative text-gray-600 hover:text-black transition-colors duration-300
             after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 
             after:bg-black hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow us</h3>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="p-3 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition-colors"
              >
                <FiFacebook className="text-xl" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-3 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition-colors"
              >
                <FiInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Diva Jeweller
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
