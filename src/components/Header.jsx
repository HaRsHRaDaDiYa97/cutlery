
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { useGetWishlistQuery } from '../features/wishlistApi';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineHeart } from 'react-icons/ai';
import { useGetCartQuery } from '../features/cartApi';
// Make sure you have a 'logout' action in your authSlice
// import { logout } from '../features/authSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'About Us', href: '/about' },
  ];

  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const { data: wishlist = [] } = useGetWishlistQuery(userId, { skip: !userId });
  const { data: cartData } = useGetCartQuery(userId, { skip: !userId });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // NOTE: You need to create and export this 'logout' action from your authSlice
  const handleLogout = () => {
    // dispatch(logout());
    console.log("Logout action dispatched"); // Placeholder
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const IconBtn = ({ to, onClick, ariaLabel, children }) => {
    const classes = "relative p-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2";
    if (to) return <Link to={to} aria-label={ariaLabel} className={classes}>{children}</Link>;
    return <button onClick={onClick} aria-label={ariaLabel} className={classes}>{children}</button>;
  };

  const ProfileMenuItem = ({ to, onClick, children }) => {
    const classes = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors";
    const clickHandler = () => {
      if (onClick) onClick();
      setIsProfileMenuOpen(false);
    };
    if (to) return <Link to={to} className={classes} role="menuitem" onClick={clickHandler}>{children}</Link>;
    return <button onClick={clickHandler} className={classes} role="menuitem">{children}</button>;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Section */}
          <div className="flex items-center">
            <button onClick={() => setIsMenuOpen(true)} className="mr-4 p-2 text-2xl md:hidden" aria-label="Open menu"><FiMenu /></button>
            <Link to="/" className="flex flex-col items-start leading-none">
              <span className="text-3xl font-bold text-gray-900 tracking-wider">DIVA</span>
              <span className="text-[0.6rem] font-medium text-gray-500 tracking-[0.2em]">JEWELLER</span>
            </Link>
          </div>

          {/* Middle Section */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.href} className={({ isActive }) => `relative text-base font-medium transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'} after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full`}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 text-2xl">
            <IconBtn to="/products" ariaLabel="Search"><FiSearch /></IconBtn>
            <IconBtn to="/wishlist" ariaLabel="Wishlist">
              <AiOutlineHeart />
              {wishlist?.length > 0 && (<span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">{wishlist.length}</span>)}
            </IconBtn>

            {/* --- PROFILE DROPDOWN SECTION (DESKTOP) --- */}
            <div className="hidden md:block relative" ref={profileMenuRef}>
              <IconBtn
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                ariaLabel="Open user menu"
              >
                <FiUser />
              </IconBtn>
              <div
                className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out
                  ${isProfileMenuOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'}`}
                role="menu" aria-orientation="vertical"
              >
                <div className="py-1" role="none">
                  {userId ? (
                    <>
                      <div className="px-4 py-3"><p className="text-sm text-gray-500">Signed in as</p><p className="truncate text-sm font-medium text-gray-900">{user.email}</p></div>
                      <div className="border-t border-gray-100"></div>
                      <ProfileMenuItem to="/account">My Account</ProfileMenuItem>
                      <ProfileMenuItem to="/orders">Order History</ProfileMenuItem>
                      <div className="border-t border-gray-100"></div>
                      <ProfileMenuItem onClick={handleLogout}>Sign Out</ProfileMenuItem>
                    </>
                  ) : (
                    <>
                      <ProfileMenuItem to="/login">Sign In</ProfileMenuItem>
                      <ProfileMenuItem to="/register">Create Account</ProfileMenuItem>
                    </>
                  )}
                </div>
              </div>
            </div>

            <IconBtn to="/cart" ariaLabel="Shopping Bag">
              <FiShoppingBag />
              {cartData?.count > 0 && (<span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">{cartData.count}</span>)}
            </IconBtn>
          </div>
        </div>
      </header>

     

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} aria-hidden="true"></div>
      <div className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-60 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link to="/" className="flex flex-col items-start leading-none" onClick={() => setIsMenuOpen(false)}><span className="text-2xl font-bold text-gray-900 tracking-wider">DIVA</span><span className="text-[0.6rem] font-medium text-gray-500 tracking-[0.2em]">JEWELLER</span></Link>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-2xl" aria-label="Close menu"><FiX /></button>
          </div>
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (<NavLink key={link.name} to={link.href} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block rounded-md px-4 py-3 text-lg font-medium transition-colors ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>{link.name}</NavLink>))}
          </nav>

          {/* --- REDESIGNED ACCOUNT SECTION (MOBILE) --- */}
          <div className="mt-auto p-4 border-t border-gray-200">
            {userId ? (
              // Logged-in view for mobile
              <div>
                <div className="px-2 py-2">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="truncate text-sm font-medium text-gray-900">{user.email}</p>
                </div>
                 <NavLink to="/account" onClick={() => setIsMenuOpen(false)} className="mt-2 flex w-full items-center gap-3 rounded-md px-4 py-3 text-lg font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"><FiUser /> My Account</NavLink>
                 <button onClick={handleLogout} className="mt-4 block w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-center text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none">
                    Sign Out
                 </button>
              </div>
            ) : (
              // Logged-out view for mobile
              <div>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full rounded-md bg-black px-6 py-3 text-center text-base font-medium text-white shadow-sm transition-colors hover:bg-gray-800">
                  Log In
                </Link>
                <div className="mt-4 text-center text-sm">
                  <p className="text-gray-600">New customer? <Link to="/register" onClick={() => setIsMenuOpen(false)} className="font-medium text-black hover:underline">Create an account</Link></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;