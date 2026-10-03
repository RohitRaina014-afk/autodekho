import express from 'express';
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleStats,
} from '../controllers/vehicleController.js';

const router = express.Router();

// Specific routes first
router.get('/stats/summary', getVehicleStats);

// General collection routes
router.route('/')
  .get(getVehicles)
  .post(createVehicle);

// Single vehicle item routes
router.route('/:id')
  .get(getVehicleById)
  .put(updateVehicle)
  .delete(deleteVehicle);

export default router;
