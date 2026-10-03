import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Car,
  Fuel,
  Gauge,
  MapPin,
  Calendar,
  Cog,
  Heart,
  Phone,
  ShieldCheck,
  Edit,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  FileCheck,
  Clock,
  Share2,
} from 'lucide-react';
import { fetchVehicleById, deleteVehicle, fetchVehicles } from '../services/api';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/formatters';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import ContactSellerModal from '../components/ContactSellerModal';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [vehicle, setVehicle] = useState(null);
  const [similarVehicles, setSimilarVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchVehicleById(id);
        if (res.success && res.data) {
          setVehicle(res.data);

          // Fetch similar vehicles by brand or fuelType
          try {
            const allRes = await fetchVehicles();
            if (allRes.data) {
              const others = allRes.data
                .filter((item) => item._id !== id)
                .slice(0, 3);
              setSimilarVehicles(others);
            }
          } catch (e) {
            console.error('Error fetching similar vehicles:', e);
          }
        } else {
          setError('Vehicle listing not found.');
        }
      } catch (err) {
        console.error('Failed to load vehicle details:', err);
        setError(err.response?.data?.message || 'Error fetching vehicle details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getDetails();
      window.scrollTo(0, 0);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteVehicle(id);
      if (res.success) {
        setIsDeleteModalOpen(false);
        navigate('/vehicles', { replace: true });
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete vehicle. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-48 bg-slate-800 rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-[450px] bg-slate-800 rounded-3xl" />
            <div className="h-[450px] bg-slate-800 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Vehicle Not Found</h2>
        <p className="text-sm text-slate-400">{error || 'This listing may have been sold or removed.'}</p>
        <Link
          to="/vehicles"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-xs shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Vehicles</span>
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(vehicle._id);

  // Approximate monthly EMI calculation for demonstration
  const monthlyEMI = Math.round((vehicle.price * 0.8 * 0.09) / 12 + (vehicle.price * 0.8) / 60);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation & Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/vehicles"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inventory</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>

          {/* Edit Button */}
          <Link
            to={`/edit-vehicle/${vehicle._id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit</span>
          </Link>

          {/* Delete Button */}
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: Large Image, Highlights, Description, Specifications */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Large Vehicle Image */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl aspect-[16/10]">
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-950/80 backdrop-blur-md text-white border border-slate-700/60 shadow-lg">
                {vehicle.year}
              </span>
              {vehicle.isFeatured && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Verified
                </span>
              )}
            </div>

            {/* Quick Wishlist on image */}
            <button
              onClick={() => toggleWishlist(vehicle)}
              className={`absolute top-4 right-4 p-3 rounded-xl backdrop-blur-md transition-all duration-200 ${
                wishlisted
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 ring-2 ring-rose-400'
                  : 'bg-slate-950/70 text-slate-200 hover:text-rose-400 border border-slate-700/50'
              }`}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Key Specifications Grid */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Cog className="w-4 h-4 text-orange-400" />
              <span>Vehicle Overview & Key Metrics</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <span>Year</span>
                </div>
                <span className="text-sm font-bold text-white">{vehicle.year}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Gauge className="w-4 h-4 text-orange-400" />
                  <span>Mileage</span>
                </div>
                <span className="text-sm font-bold text-white">
                  {vehicle.mileage?.toLocaleString('en-IN')} km
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Fuel className="w-4 h-4 text-orange-400" />
                  <span>Fuel Type</span>
                </div>
                <span className="text-sm font-bold text-white">{vehicle.fuelType}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Cog className="w-4 h-4 text-orange-400" />
                  <span>Transmission</span>
                </div>
                <span className="text-sm font-bold text-white">{vehicle.transmission}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Car className="w-4 h-4 text-orange-400" />
                  <span>Body Style</span>
                </div>
                <span className="text-sm font-bold text-white">{vehicle.category || 'Sedan'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>Location</span>
                </div>
                <span className="text-sm font-bold text-white truncate block">
                  {vehicle.location}
                </span>
              </div>
            </div>
          </div>

          {/* Engine & Technical Specifications */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Engine & Powertrain</h3>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Powertrain Specification</span>
                <span className="text-sm font-bold text-orange-400">{vehicle.engine}</span>
              </div>
              <span className="px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
                Inspected
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Seller Description</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {vehicle.description}
            </p>
          </div>

          {/* Factory Features & Equipment */}
          {vehicle.features && vehicle.features.length > 0 && (
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Features & Equipment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 text-slate-200 text-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Price Card, Seller Lead Form & Actions */}
        <div className="space-y-6 sticky top-28">
          {/* Price & Summary Box */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                {vehicle.brand}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                {vehicle.model}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>{vehicle.location}</span>
              </div>
            </div>

            {/* Price Tag */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                All-Inclusive Asking Price
              </span>
              <div className="text-3xl font-extrabold text-white">
                {formatCurrency(vehicle.price)}
              </div>
              <p className="text-xs text-emerald-400 flex items-center gap-1 pt-1 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Brokerage &bull; Direct Deal</span>
              </p>
            </div>

            {/* EMI Preview */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
              <span>Estimated EMI</span>
              <span className="font-semibold text-slate-200">
                ₹{monthlyEMI.toLocaleString('en-IN')} / mo*
              </span>
            </div>

            {/* Main Action CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Seller</span>
              </button>

              <button
                onClick={() => toggleWishlist(vehicle)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
                  wishlisted
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>

          {/* Verified Seller Trust Box */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Seller & Assurance
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
                AD
              </div>
              <div>
                <span className="text-sm font-bold text-white block">AutoDekho Certified Seller</span>
                <span className="text-xs text-slate-400">Identity & RC Verified</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-xs text-slate-300 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Clear Title & Fast RTO Transfer</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>Authorized Service Records Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Typically responds within 1 hour</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Vehicles Carousel / Grid */}
      {similarVehicles.length > 0 && (
        <section className="pt-8 border-t border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Similar Vehicles You May Like</h2>
            <Link to="/vehicles" className="text-xs font-semibold text-orange-400 hover:text-orange-300">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {similarVehicles.map((item) => (
              <div key={item._id} className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden p-4 space-y-3">
                <img
                  src={item.image}
                  alt={item.model}
                  className="w-full h-40 object-cover rounded-xl"
                />
                <div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.brand} {item.model}</h4>
                  <p className="text-xs text-orange-400 font-semibold mt-1">{formatCurrency(item.price)}</p>
                </div>
                <Link
                  to={`/vehicles/${item._id}`}
                  className="block text-center w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modals */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        vehicleTitle={`${vehicle.brand} ${vehicle.model}`}
        isDeleting={isDeleting}
      />

      <ContactSellerModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        vehicle={vehicle}
      />
    </div>
  );
};

export default VehicleDetails;
