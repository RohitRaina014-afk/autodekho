import axios from 'axios';

// Base Axios instance
// In local dev, Vite proxy forwards '/api' to 'http://localhost:5000/api'
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Fetch all vehicles with optional filters, search queries, and sorting.
 * @param {Object} params - { search, brand, fuelType, transmission, minPrice, maxPrice, sort, featured, category }
 */
export const fetchVehicles = async (params = {}) => {
  const response = await API.get('/vehicles', { params });
  return response.data;
};

/**
 * Fetch a single vehicle by its MongoDB ObjectId.
 * @param {string} id
 */
export const fetchVehicleById = async (id) => {
  const response = await API.get(`/vehicles/${id}`);
  return response.data;
};

/**
 * Create a new vehicle listing.
 * @param {Object} vehicleData
 */
export const createVehicle = async (vehicleData) => {
  const response = await API.post('/vehicles', vehicleData);
  return response.data;
};

/**
 * Update an existing vehicle listing.
 * @param {string} id
 * @param {Object} vehicleData
 */
export const updateVehicle = async (id, vehicleData) => {
  const response = await API.put(`/vehicles/${id}`, vehicleData);
  return response.data;
};

/**
 * Delete a vehicle listing.
 * @param {string} id
 */
export const deleteVehicle = async (id) => {
  const response = await API.delete(`/vehicles/${id}`);
  return response.data;
};

/**
 * Fetch aggregated marketplace statistics.
 */
export const fetchVehicleStats = async () => {
  const response = await API.get('/vehicles/stats/summary');
  return response.data;
};

export default API;
