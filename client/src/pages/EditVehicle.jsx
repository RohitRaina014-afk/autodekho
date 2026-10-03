import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Save,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { fetchVehicleById, updateVehicle } from '../services/api';

const currentYear = new Date().getFullYear();

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
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

  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setInitialLoading(true);
        const res = await fetchVehicleById(id);
        if (res.success && res.data) {
          const v = res.data;
          setFormData({
            brand: v.brand || '',
            model: v.model || '',
            year: v.year || '',
            price: v.price || '',
            fuelType: v.fuelType || 'Petrol',
            transmission: v.transmission || 'Automatic',
            mileage: v.mileage || '',
            location: v.location || '',
            image: v.image || '',
            engine: v.engine || '',
            category: v.category || 'Sedan',
            description: v.description || '',
          });
        } else {
          setError('Could not fetch vehicle details to edit.');
        }
      } catch (err) {
        console.error('Error loading vehicle:', err);
        setError(err.response?.data?.message || 'Error loading vehicle.');
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) loadVehicle();
  }, [id]);

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
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await updateVehicle(id, formData);
      if (res.success) {
        setSuccessMsg('Vehicle updated successfully!');
        setTimeout(() => {
          navigate(`/vehicles/${id}`);
        }, 1200);
      } else {
        setError(res.message || 'Failed to update vehicle.');
      }
    } catch (err) {
      console.error('Error updating vehicle:', err);
      setError(err.response?.data?.message || 'Server error while updating.');
    } finally {
      setSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Loader2 className="w-8 h-8 text-orange-400 animate-spin mx-auto" />
        <p className="text-sm text-slate-400 mt-3">Loading vehicle details for editing...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-orange-400 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel & Go Back</span>
          </button>
          <h1 className="text-3xl font-extrabold text-white">
            Edit Vehicle: {formData.brand} {formData.model}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Update pricing, specifications, description or photo.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Brand / Manufacturer <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              name="brand"
              required
              value={formData.brand}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
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
              value={formData.model}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

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
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Mileage (km) <span className="text-orange-400">*</span>
            </label>
            <input
              type="number"
              name="mileage"
              required
              min="0"
              value={formData.mileage}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Location <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
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
              value={formData.engine}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

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
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          {formData.image && (
            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <img
                src={formData.image}
                alt="Preview"
                className="w-24 h-16 object-cover rounded-lg border border-slate-700"
              />
              <span className="text-xs text-slate-400 truncate max-w-sm">{formData.image}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Description <span className="text-orange-400">*</span>
          </label>
          <textarea
            name="description"
            required
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => navigate(`/vehicles/${id}`)}
            className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-xl shadow-orange-500/25 transition-all disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehicle;
