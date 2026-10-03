import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { createVehicle } from '../services/api';

const currentYear = new Date().getFullYear();

const AddVehicle = () => {
  const navigate = useNavigate();

  // Form input state
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: currentYear,
    price: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '',
    location: '',
    image: '',
    engine: '',
    category: 'Sedan',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Quick Demo Presets for seamless interview demonstrations!
  const presets = [
    {
      label: '⚡ Tesla Model 3 Long Range',
      data: {
        brand: 'Tesla',
        model: 'Model 3 Dual Motor AWD',
        year: 2023,
        price: 5800000,
        fuelType: 'Electric',
        transmission: 'Automatic',
        mileage: 9500,
        location: 'Mumbai, Maharashtra',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
        engine: 'Dual Electric Motor AWD (450 HP)',
        category: 'Electric',
        description: 'Pearl White Multi-Coat Tesla Model 3 with Enhanced Autopilot, Premium Black Leather Interior, and 15-inch center touch control display. Zero emissions and sub-4.2s acceleration.',
      },
    },
    {
      label: '🏎️ BMW M340i xDrive',
      data: {
        brand: 'BMW',
        model: 'M340i xDrive Sedan',
        year: 2024,
        price: 6900000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 4800,
        location: 'Bengaluru, Karnataka',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
        engine: '3.0L Turbocharged Inline-6 (382 HP)',
        category: 'Sedan',
        description: 'Tanzanite Blue metallic BMW M340i with M Sport Differential, M Sport Brakes with red calipers, Harman Kardon surround audio, and BMW Laserlights. Showroom condition with 5-year BSI package.',
      },
    },
    {
      label: '🚙 Land Rover Defender 110',
      data: {
        brand: 'Land Rover',
        model: 'Defender 110 SE D300',
        year: 2023,
        price: 9800000,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        mileage: 18000,
        location: 'Delhi NCR',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
        engine: '3.0L 6-Cylinder Twin-Turbo Diesel (300 HP)',
        category: 'SUV',
        description: 'Iconic Gondwana Stone Land Rover Defender 110 with electronic air suspension, Terrain Response 2, Meridian 3D sound system, and rugged all-terrain capability.',
      },
    },
  ];

  const applyPreset = (presetData) => {
    setFormData(presetData);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Frontend validations
    if (
      !formData.brand.trim() ||
      !formData.model.trim() ||
      !formData.price ||
      !formData.mileage ||
      !formData.location.trim() ||
      !formData.image.trim() ||
      !formData.description.trim() ||
      !formData.engine.trim()
    ) {
      setError('Please fill in all required fields marked with an asterisk (*).');
      return;
    }

    if (Number(formData.price) <= 0) {
      setError('Price must be greater than zero.');
      return;
    }

    if (Number(formData.mileage) < 0) {
      setError('Mileage cannot be negative.');
      return;
    }

    try {
      setLoading(true);
      const res = await createVehicle(formData);
      if (res.success) {
        setSuccessMsg(`Vehicle "${formData.brand} ${formData.model}" listed successfully!`);
        setTimeout(() => {
          navigate('/vehicles');
        }, 1500);
      } else {
        setError(res.message || 'Failed to list vehicle.');
      }
    } catch (err) {
      console.error('Error creating vehicle:', err);
      setError(
        err.response?.data?.message || 'Server error while submitting vehicle listing.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">
            Seller Portal
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">List a New Vehicle</h1>
          <p className="text-sm text-slate-400 mt-1">
            Provide vehicle details, high-resolution photo URL, and pricing to reach prospective buyers.
          </p>
        </div>
      </div>

      {/* Quick Demo Fill Bar for Interview Demos */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-orange-500/20 bg-orange-950/20 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
          <Sparkles className="w-4 h-4" />
          <span>Quick Demo Auto-Fill (For Instant Interview Demonstration):</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p.data)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-orange-500 text-slate-200 hover:text-white transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg} Redirecting to inventory...</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        {/* Brand & Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Brand / Manufacturer <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              name="brand"
              required
              placeholder="e.g. BMW, Mercedes, Tata, Toyota"
              value={formData.brand}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Model Name & Variant <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              name="model"
              required
              placeholder="e.g. 3 Series 330i M Sport"
              value={formData.model}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Year, Price & Body Style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Manufacturing Year <span className="text-orange-400">*</span>
            </label>
            <input
              type="number"
              name="year"
              required
              min="1995"
              max={currentYear + 1}
              value={formData.year}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Price (in INR ₹) <span className="text-orange-400">*</span>
            </label>
            <input
              type="number"
              name="price"
              required
              min="10000"
              placeholder="e.g. 4850000"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Body Style / Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
            </select>
          </div>
        </div>

        {/* Fuel Type & Transmission */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Fuel Type <span className="text-orange-400">*</span>
            </label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Transmission <span className="text-orange-400">*</span>
            </label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>

        {/* Mileage, Location & Engine */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Odometer Mileage (km) <span className="text-orange-400">*</span>
            </label>
            <input
              type="number"
              name="mileage"
              required
              min="0"
              placeholder="e.g. 14200"
              value={formData.mileage}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              City / Location <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g. Mumbai, Maharashtra"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Engine Specs <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              name="engine"
              required
              placeholder="e.g. 2.0L Turbo 255 HP"
              value={formData.engine}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Image URL & Live Preview */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Vehicle Image URL <span className="text-orange-400">*</span>
          </label>
          <div className="relative">
            <ImageIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="url"
              name="image"
              required
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Live Thumbnail Preview */}
          {formData.image && (
            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <img
                src={formData.image}
                alt="Preview"
                className="w-24 h-16 object-cover rounded-lg border border-slate-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold block">Live Image Preview</span>
                <span className="truncate block max-w-sm">{formData.image}</span>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Detailed Vehicle Description <span className="text-orange-400">*</span>
          </label>
          <textarea
            name="description"
            required
            rows="4"
            placeholder="Describe vehicle condition, service history, ownership, tire condition, and any premium upgrades..."
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 resize-none"
          />
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => navigate('/vehicles')}
            className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm shadow-xl shadow-orange-500/25 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing Listing...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Publish Vehicle Listing</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
