import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Car,
  Heart,
  PlusCircle,
  Menu,
  X,
  Compass,
  Info,
  Search,
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/vehicles?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
      setMobileMenuOpen(false);
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium transition-all duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
      isActive
        ? 'text-orange-400 bg-orange-500/10 font-semibold'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <Car className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Auto<span className="text-orange-500">Dekho</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-orange-400/90 uppercase -mt-1">
                Discover Your Next Drive
              </span>
            </div>
          </Link>

          {/* Quick Search bar on Desktop */}
          <form
            onSubmit={handleNavSearch}
            className="hidden lg:flex items-center relative w-72"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search BMW, Fortuner, Mumbai..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/70 text-slate-200 text-xs rounded-full pl-9 pr-4 py-2 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-slate-500 transition-colors"
            />
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <NavLink to="/" className={navLinkClasses} end>
              Home
            </NavLink>
            <NavLink to="/vehicles" className={navLinkClasses}>
              <Compass className="w-4 h-4" />
              Explore Vehicles
            </NavLink>
            <NavLink to="/add-vehicle" className={navLinkClasses}>
              <PlusCircle className="w-4 h-4" />
              Add Vehicle
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              <Info className="w-4 h-4" />
              About
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Wishlist Icon Button */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-red-400 hover:border-slate-700 transition-colors"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-600 to-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-slate-950 animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* List Your Vehicle Primary Button */}
            <Link
              to="/add-vehicle"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold text-sm shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>List Your Car</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Search */}
          <form onSubmit={handleNavSearch} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search make, model, city..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-orange-500"
            />
          </form>

          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/vehicles"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              Explore Vehicles
            </Link>
            <Link
              to="/add-vehicle"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              Add Vehicle
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              Saved Wishlist ({wishlistCount})
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              About AutoDekho
            </Link>
          </div>

          <div className="pt-2">
            <Link
              to="/add-vehicle"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              List Your Car Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
