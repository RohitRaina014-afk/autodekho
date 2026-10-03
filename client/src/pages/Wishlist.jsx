import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Compass, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import VehicleCard from '../components/VehicleCard';

const Wishlist = () => {
  const { wishlist, wishlistCount, clearWishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-rose-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-rose-400" />
            <span>Saved Favorites</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Your Vehicle Wishlist
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Keep track of cars you are interested in. Saved directly in your browser session.
          </p>
        </div>

        {wishlistCount > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearWishlist}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore More</span>
            </Link>
          </div>
        )}
      </div>

      {/* Content */}
      {wishlistCount === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-5 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Your wishlist is empty</h2>
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
              Explore our marketplace and click the heart icon on any vehicle card to save it for quick reference later.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold text-sm shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4" />
              <span>Browse Vehicle Inventory</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>You have <strong className="text-white">{wishlistCount}</strong> {wishlistCount === 1 ? 'vehicle' : 'vehicles'} saved</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
