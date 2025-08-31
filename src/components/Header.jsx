// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { useGetWishlistQuery } from '../features/wishlistApi';
import { useSelector } from 'react-redux';

import { AiOutlineHeart } from 'react-icons/ai'; // Heart icon

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Navigation Links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },

  ];


  const userId = useSelector((state) => state.auth.user?.id);
  const { data: wishlist = [], isLoading } = useGetWishlistQuery(userId);


  return (
    <>
      {/* ============================== */}
      {/* ==      MAIN HEADER         == */}
      {/* ============================== */}
      <header className="sticky top-0 z-40 bg-gray-50/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

          {/* == Left Section: Hamburger (Mobile) & Logo == */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="mr-4 text-2xl md:hidden"
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
            <Link to="/" className="flex flex-col items-start leading-none">
              <span className="text-2xl font-bold text-blue-900 tracking-wider">DIVA</span>
              <span className="text-[0.6rem] font-medium text-gray-600 tracking-[0.2em]">JEWELLER</span>
            </Link>
          </div>

          {/* == Middle Section: Desktop Navigation Links == */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative text-black hover:text-black transition-colors duration-300
             after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 
             after:bg-black hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}



              </Link>
            ))}
          </nav>

          {/* == Right Section: Icons == */}
          <div className="flex items-center gap-5 text-xl">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="text-gray-700 hover:text-blue-900"
            >
              <FiSearch />
            </button>


            {/* Wishlist (Heart Button with Count) */}
            <Link to="/wishlist" aria-label="Wishlist" className="relative text-gray-700 hover:text-blue-900">
              <AiOutlineHeart size={22} />
              {!isLoading && wishlist?.length > 0 && (
                <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center 
                  rounded-full bg-red-500 text-[10px] text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/account" aria-label="My Account" className="hidden text-gray-700 hover:text-blue-900 md:block">
              <FiUser />
            </Link>
            <Link to="/cart" aria-label="Shopping Bag" className="relative text-gray-700 hover:text-blue-900">
              <FiShoppingBag />
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* ============================== */}
      {/* ==  EXPANDED SEARCH OVERLAY == */}
      {/* ============================== */}
      <div
        className={`fixed top-0 left-0 w-full bg-white z-50 shadow-lg transition-all duration-300 ease-in-out
          ${isSearchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-6">
          {/* Search Input Field */}
          <div className="relative flex-grow">
            <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products"
              className="w-full h-10 rounded-md border border-gray-300 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Right side Icons */}
          <div className="flex items-center gap-5 text-xl">
            <Link to="/account" aria-label="My Account" className="text-gray-700 hover:text-blue-900">
              <FiUser />
            </Link>
            <Link to="/cart" aria-label="Shopping Bag" className="relative text-gray-700 hover:text-blue-900">
              <FiShoppingBag />
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                0
              </span>
            </Link>
            <button onClick={() => setIsSearchOpen(false)} aria-label="Close search" className="text-2xl text-gray-700 hover:text-blue-900">
              <FiX />
            </button>
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* ==   MOBILE MENU DRAWER     == */}
      {/* ============================== */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-60 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex flex-col items-start leading-none">
              <span className="text-2xl font-bold text-blue-900 tracking-wider">DIVA</span>
              <span className="text-[0.6rem] font-medium text-gray-600 tracking-[0.2em]">JEWELLER</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl"
              aria-label="Close menu"
            >
              <FiX />
            </button>
          </div>

          {/* Drawer Navigation */}
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-lg font-medium text-gray-800 hover:text-blue-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Drawer Footer/Account Section */}
          <div className="mt-auto p-4 border-t">
            <h3 className="font-semibold text-gray-800">My Account</h3>
            <Link
              to="/login"
              className="mt-3 block w-full bg-gray-900 text-center text-white py-2.5 rounded-md font-semibold hover:bg-gray-800 transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
