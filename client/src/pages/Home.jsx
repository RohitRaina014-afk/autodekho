import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Car,
  Compass,
  PlusCircle,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  ArrowRight,
  Search,
  CheckCircle,
} from 'lucide-react';
import { fetchVehicles, fetchVehicleStats } from '../services/api';
import VehicleCard from '../components/VehicleCard';

const Home = () => {
  const navigate = useNavigate();
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [stats, setStats] = useState({
    totalVehicles: 10,
    totalBrands: 7,
    avgPrice: 3800000,
  });
  const [loading, setLoading] = useState(true);

  // Hero Quick Search State
  const [heroBrand, setHeroBrand] = useState('All');
  const [heroFuel, setHeroFuel] = useState('All');
  const [heroBudget, setHeroBudget] = useState('All');

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        // Fetch featured vehicles or fallback to latest
        const res = await fetchVehicles({ featured: 'true' });
        if (res.data && res.data.length > 0) {
          setFeaturedVehicles(res.data.slice(0, 4));
        } else {
          // If no featured, get latest 4
          const allRes = await fetchVehicles();
          setFeaturedVehicles(allRes.data.slice(0, 4));
        }

        // Fetch stats
        const statsRes = await fetchVehicleStats();
        if (statsRes.success) {
          setStats(statsRes.data);
        }
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (heroBrand !== 'All') params.append('brand', heroBrand);
    if (heroFuel !== 'All') params.append('fuelType', heroFuel);
    if (heroBudget !== 'All') params.append('maxPrice', heroBudget);
    navigate(`/vehicles?${params.toString()}`);
  };

  const categories = [
    { name: 'SUV', label: 'SUVs & 4x4', count: 'High Demand', icon: '🚙', path: '/vehicles?category=SUV' },
    { name: 'Sedan', label: 'Executive Sedans', count: 'Top Comfort', icon: '🚘', path: '/vehicles?category=Sedan' },
    { name: 'Luxury', label: 'Luxury & Sports', count: 'Premium Class', icon: '🏎️', path: '/vehicles?category=Luxury' },
    { name: 'Electric', label: 'Electric & EV', count: 'Eco Friendly', icon: '⚡', path: '/vehicles?fuelType=Electric' },
    { name: 'Hybrid', label: 'Smart Hybrids', count: '27+ kmpl Mileage', icon: '🔋', path: '/vehicles?fuelType=Hybrid' },
  ];

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-600/20 to-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute -top-20 right-10 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold tracking-wide shadow-sm animate-pulse">
              <Zap className="w-4 h-4 fill-orange-400" />
              <span>India&apos;s Verified Digital Car Marketplace</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Find the car that fits <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">your journey.</span>
            </h1>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore thousands of inspected, verified pre-owned & certified vehicles. Transparent pricing, complete service histories, and direct seller contact.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/vehicles"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Compass className="w-5 h-5 stroke-[2.2]" />
                <span>Explore Vehicles</span>
              </Link>
              <Link
                to="/add-vehicle"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700 hover:border-slate-600 transition-all duration-300"
              >
                <PlusCircle className="w-5 h-5 stroke-[2.2] text-orange-400" />
                <span>List Your Vehicle</span>
              </Link>
            </div>
          </div>

          {/* Quick Filter Box on Hero */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="glass-panel rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-800">
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {/* Brand */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Brand / Make
                  </label>
                  <select
                    value={heroBrand}
                    onChange={(e) => setHeroBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-orange-500"
                  >
                    <option value="All">All Brands</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Tata">Tata Motors</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Kia">Kia</option>
                    <option value="Honda">Honda</option>
                    <option value="Porsche">Porsche</option>
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Fuel Type
                  </label>
                  <select
                    value={heroFuel}
                    onChange={(e) => setHeroFuel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-orange-500"
                  >
                    <option value="All">Any Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric (EV)</option>
                    <option value="Hybrid">Strong Hybrid</option>
                  </select>
                </div>

                {/* Max Budget */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Max Budget
                  </label>
                  <select
                    value={heroBudget}
                    onChange={(e) => setHeroBudget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-orange-500"
                  >
                    <option value="All">No Budget Cap</option>
                    <option value="2000000">Under ₹20 Lakh</option>
                    <option value="3000000">Under ₹30 Lakh</option>
                    <option value="5000000">Under ₹50 Lakh</option>
                    <option value="10000000">Under ₹1 Crore</option>
                  </select>
                </div>

                {/* Search CTA */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/30 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Vehicles</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">
              Segment Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Browse by Vehicle Category
            </h2>
          </div>
          <Link
            to="/vehicles"
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 inline-flex items-center gap-1"
          >
            <span>See All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-orange-500/40 hover:bg-slate-800/80 transition-all duration-200 group text-center flex flex-col items-center justify-center gap-3 shadow-md"
            >
              <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
                {cat.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED VEHICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">
              Handpicked Deals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Featured Verified Listings
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Inspected luxury, sport, and daily commuters ready for immediate delivery.
            </p>
          </div>
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : featuredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">No vehicles currently listed.</p>
          </div>
        )}
      </section>

      {/* 4. WHY AUTODEKHO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">
            Uncompromising Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Why Choose AutoDekho?
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            We built AutoDekho to strip out the friction, hidden fees, and uncertainty of buying pre-owned automobiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">200-Point Inspection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every engine, transmission, electrical system, and chassis undergoes rigorous testing before appearing online.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Transparent Pricing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real market valuations driven by data. Zero hidden charges, surprise documentation markups, or dealership surcharges.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Verified Documentation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clean title verification, NOC clearance assistance, and seamless RC transfer support directly handled for peace of mind.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Fast Free Listing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sellers can publish vehicles in under 3 minutes with photo uploads, live specs, and reach verified buyers nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PLATFORM STATISTICS */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                {stats.totalVehicles || 10}+
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                Active Vehicle Listings
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                {stats.totalBrands || 7}+
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                Premium Brands Represented
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                99.4%
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                Verified Seller Rating
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                4.9 / 5
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                Customer Satisfaction Score
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 p-8 sm:p-14 text-white shadow-2xl car-glow">
          {/* Decorative Background Elements */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-8">
            <Car className="w-96 h-96" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              Direct Marketplace
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to sell your car for the best market price?
            </h2>
            <p className="text-sm sm:text-base text-orange-100 leading-relaxed">
              List your vehicle on AutoDekho today. Reach thousands of genuine automotive enthusiasts with instant inquiries and zero brokerage.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to="/add-vehicle"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                <span>List Your Vehicle Free</span>
              </Link>
              <Link
                to="/vehicles"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-orange-700/60 hover:bg-orange-700 text-white font-semibold text-sm border border-orange-400/40 transition-colors"
              >
                <span>Browse Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
