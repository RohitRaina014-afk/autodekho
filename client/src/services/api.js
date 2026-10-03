import axios from 'axios';
import { fallbackVehicles } from '../data/fallbackVehicles';

// Base Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

/**
 * Fetch all vehicles with optional filters, search queries, and sorting.
 */
export const fetchVehicles = async (params = {}) => {
  try {
    const response = await API.get('/vehicles', { params });
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable, using fallback demonstration vehicles:', error.message);
    let list = [...fallbackVehicles];
    if (params.featured === 'true') {
      list = list.filter((v) => v.isFeatured);
    }
    return {
      success: true,
      count: list.length,
      data: list,
      isDemoFallback: true,
    };
  }
};

/**
 * Fetch a single vehicle by its ID.
 */
export const fetchVehicleById = async (id) => {
  try {
    const response = await API.get(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable, searching fallback vehicles:', error.message);
    const found = fallbackVehicles.find((v) => v._id === id) || fallbackVehicles[0];
    return {
      success: true,
      data: found,
      isDemoFallback: true,
    };
  }
};

/**
 * Create a new vehicle listing.
 */
export const createVehicle = async (vehicleData) => {
  try {
    const response = await API.post('/vehicles', vehicleData);
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable, creating local demo vehicle:', error.message);
    const newDemoCar = {
      ...vehicleData,
      _id: `demo-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    fallbackVehicles.unshift(newDemoCar);
    return {
      success: true,
      message: 'Vehicle listed successfully (Demo Mode)!',
      data: newDemoCar,
    };
  }
};

/**
 * Update an existing vehicle listing.
 */
export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await API.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    return {
      success: true,
      message: 'Vehicle updated successfully (Demo Mode)!',
      data: { ...vehicleData, _id: id },
    };
  }
};

/**
 * Delete a vehicle listing.
 */
export const deleteVehicle = async (id) => {
  try {
    const response = await API.delete(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: true,
      message: 'Vehicle removed successfully (Demo Mode)!',
    };
  }
};

/**
 * Fetch aggregated marketplace statistics.
 */
export const fetchVehicleStats = async () => {
  try {
    const response = await API.get('/vehicles/stats/summary');
    return response.data;
  } catch (error) {
    return {
      success: true,
      data: {
        totalVehicles: fallbackVehicles.length,
        totalBrands: 8,
        avgPrice: 4200000,
        featuredCount: 6,
      },
    };
  }
};

export default API;
