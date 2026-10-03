import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  ArrowUpDown,
  RotateCcw,
  Car,
  AlertCircle,
  PlusCircle,
} from 'lucide-react';
import { fetchVehicles } from '../services/api';
import VehicleCard from '../components/VehicleCard';
import { formatCurrency } from '../utils/formatters';

const Vehicles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States initialized from URL params if present
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'All');
  const [selectedFuel, setSelectedFuel] = useState(searchParams.get('fuelType') || 'All');
  const [selectedTransmission, setSelectedTransmission] = useState(searchParams.get('transmission') || 'All');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 10000000);
  const [sortBy, setSortBy] = useState('newest');

  // Load all vehicles from API
  const loadVehicles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchVehicles();
      if (res.success) {
        setVehicles(res.data);
      } else {
        setError('Failed to retrieve vehicle listings.');
      }
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError('Could not connect to the vehicle database. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  // Update URL search parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedBrand !== 'All') params.set('brand', selectedBrand);
    if (selectedFuel !== 'All') params.set('fuelType', selectedFuel);
    if (selectedTransmission !== 'All') params.set('transmission', selectedTransmission);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (maxPrice < 10000000) params.set('maxPrice', maxPrice.toString());
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedBrand, selectedFuel, selectedTransmission, selectedCategory, maxPrice, setSearchParams]);

  // Dynamic list of unique brands in inventory
  const availableBrands = useMemo(() => {
    const brandsSet = new Set(vehicles.map((v) => v.brand));
    return ['All', ...Array.from(brandsSet).sort()];
  }, [vehicles]);

  // Combined Searching, Filtering & Sorting logic
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((car) => {
        // Search against brand, model, location
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchBrand = car.brand?.toLowerCase().includes(query);
          const matchModel = car.model?.toLowerCase().includes(query);
          const matchLocation = car.location?.toLowerCase().includes(query);
          if (!matchBrand && !matchModel && !matchLocation) return false;
        }

        // Brand Filter
        if (selectedBrand !== 'All' && car.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }

        // Fuel Type Filter
        if (selectedFuel !== 'All' && car.fuelType !== selectedFuel) {
          return false;
        }

        // Transmission Filter
        if (selectedTransmission !== 'All' && car.transmission !== selectedTransmission) {
          return false;
        }

        // Category Filter
        if (selectedCategory !== 'All' && car.category !== selectedCategory) {
          return false;
        }

        // Price Filter
        if (car.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'year_desc') return b.year - a.year;
        if (sortBy === 'mileage_asc') return a.mileage - b.mileage;
        // Default: newest createdAt
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [vehicles, searchTerm, selectedBrand, selectedFuel, selectedTransmission, selectedCategory, maxPrice, sortBy]);

  // Reset all filters to default
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('All');
    setSelectedFuel('All');
    setSelectedTransmission('All');
    setSelectedCategory('All');
    setMaxPrice(10000000);
    setSortBy('newest');
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedBrand !== 'All' ||
    selectedFuel !== 'All' ||
    selectedTransmission !== 'All' ||
    selectedCategory !== 'All' ||
    maxPrice < 10000000 ||
    sortBy !== 'newest';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">
            Verified Inventory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Explore All Vehicles
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse through {vehicles.length} high-grade inspected cars available across India.
          </p>
        </div>

        <Link
          to="/add-vehicle"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-md shadow-orange-500/25 self-start md:self-auto transition-colors"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>List Your Car Free</span>
        </Link>
      </div>

      {/* Search & Filter Controls Card */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-5">
        {/* Row 1: Search Bar & Sort Dropdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by brand, model, or city (e.g. BMW, Fortuner, Mumbai)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-orange-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="newest">Sort by: Newest Listings</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="year_desc">Manufacturing Year: Newest</option>
              <option value="mileage_asc">Mileage: Lowest First</option>
            </select>
          </div>
        </div>

        {/* Row 2: Secondary Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-4 border-t border-slate-800/80 text-xs">
          {/* Brand */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Brand / Make
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-orange-500"
            >
              {availableBrands.map((b) => (
                <option key={b} value={b}>
                  {b === 'All' ? 'All Brands' : b}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Fuel Type
            </label>
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="All">All Fuels</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Transmission
            </label>
            <select
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="All">All Transmissions</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Body Style
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="All">All Styles</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Max Price Slider & Label */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Max Price:
              </label>
              <span className="text-orange-400 font-bold text-[11px]">
                {maxPrice >= 10000000 ? 'Any' : formatCurrency(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="1000000"
              max="10000000"
              step="250000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
        </div>

        {/* Active Filters Summary & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Showing <strong className="text-white font-bold">{filteredVehicles.length}</strong> of {vehicles.length} vehicles</span>
            {hasActiveFilters && (
              <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-semibold text-[11px]">
                Filters Active
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Vehicle Grid / States */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-96 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Database Error</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">{error}</p>
          <button
            onClick={loadVehicles}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredVehicles.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto">
            <Car className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No vehicles found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            We couldn&apos;t find any vehicles matching your selected filters. Try broadening your search or resetting filters.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear All Filters</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Vehicles;
