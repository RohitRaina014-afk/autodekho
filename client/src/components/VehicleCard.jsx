import React from 'react';
import { Link } from 'react-router-dom';
import {
  Fuel,
  MapPin,
  Cog,
  Heart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/formatters';

const VehicleCard = ({ vehicle }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(vehicle._id);

  return (
    <div className="group relative bg-slate-900/90 rounded-2xl border border-slate-800/80 overflow-hidden card-hover flex flex-col h-full shadow-lg shadow-black/40">
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Badges on Top */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700/60 shadow">
            {vehicle.year}
          </span>
          {vehicle.isFeatured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
          {vehicle.category && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900/80 text-orange-400 border border-orange-500/20 shadow">
              {vehicle.category}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(vehicle);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-md transition-all duration-200 z-10 ${
            wishlisted
              ? 'bg-rose-500/90 text-white shadow-lg shadow-rose-500/30 ring-2 ring-rose-400/50 scale-105'
              : 'bg-slate-950/70 text-slate-300 hover:text-rose-400 hover:bg-slate-900/90 border border-slate-700/40'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Location chip inside image bottom-left */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800/80">
          <MapPin className="w-3 h-3 text-orange-400" />
          <span className="truncate max-w-[200px]">{vehicle.location}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        {/* Title & Brand */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-orange-400 uppercase tracking-wider">{vehicle.brand}</span>
            <span className="text-[11px] font-mono text-slate-400">{vehicle.mileage?.toLocaleString('en-IN')} km</span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
            {vehicle.brand} {vehicle.model}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {vehicle.description}
          </p>
        </div>

        {/* Key Specification Pills */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/50 border border-slate-800/40 text-slate-300">
            <Fuel className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate font-medium">{vehicle.fuelType}</span>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/50 border border-slate-800/40 text-slate-300">
            <Cog className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate font-medium">{vehicle.transmission}</span>
          </div>
        </div>

        {/* Bottom Price & View Details Action */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Asking Price
            </span>
            <span className="text-xl font-extrabold text-white tracking-tight">
              {formatCurrency(vehicle.price)}
            </span>
          </div>

          <Link
            to={`/vehicles/${vehicle._id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/30 hover:border-orange-500 text-xs font-semibold transition-all duration-200 group-hover:translate-x-0.5"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
