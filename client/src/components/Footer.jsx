import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, CheckCircle2, ShieldCheck, PhoneCall, Award, Heart } from 'lucide-react';

const currentYear = new Date().getFullYear();

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 mt-20">
      {/* Top Value Propositions */}
      <div className="border-b border-slate-800/60 py-8 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-100 font-semibold text-sm">200+ Point Inspection</h4>
                <p className="text-xs text-slate-400">Every listed car undergoes verified mechanical checks.</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-100 font-semibold text-sm">Transparent Pricing</h4>
                <p className="text-xs text-slate-400">Zero hidden commissions or unexpected dealership fees.</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-100 font-semibold text-sm">Direct Seller Connect</h4>
                <p className="text-xs text-slate-400">Message or call verified car owners in seconds.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Car className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Auto<span className="text-orange-500">Dekho</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Discover your next drive. AutoDekho connects discerning car buyers with trusted private sellers and certified dealerships across India.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live MERN Stack Platform v1.0.0
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/vehicles" className="hover:text-orange-400 transition-colors">
                  Explore All Cars
                </Link>
              </li>
              <li>
                <Link to="/vehicles?featured=true" className="hover:text-orange-400 transition-colors">
                  Featured Collection
                </Link>
              </li>
              <li>
                <Link to="/add-vehicle" className="hover:text-orange-400 transition-colors">
                  List Your Car
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-orange-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors">
                  About Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Brands */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Top Brands</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/vehicles?brand=BMW" className="hover:text-orange-400 transition-colors">
                  BMW
                </Link>
              </li>
              <li>
                <Link to="/vehicles?brand=Mercedes-Benz" className="hover:text-orange-400 transition-colors">
                  Mercedes-Benz
                </Link>
              </li>
              <li>
                <Link to="/vehicles?brand=Audi" className="hover:text-orange-400 transition-colors">
                  Audi
                </Link>
              </li>
              <li>
                <Link to="/vehicles?brand=Toyota" className="hover:text-orange-400 transition-colors">
                  Toyota
                </Link>
              </li>
              <li>
                <Link to="/vehicles?brand=Tata" className="hover:text-orange-400 transition-colors">
                  Tata Motors
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Price Alerts */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Price Alerts</h4>
            <p className="text-xs text-slate-400">
              Get notified when verified cars matching your budget get listed.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You will receive new listing updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs transition-colors border border-slate-700"
                >
                  Subscribe for Alerts
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} AutoDekho. Built for Full-Stack Developer Demonstration.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
            <span>using MongoDB, Express, React & Node.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
