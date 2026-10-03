import Vehicle from '../models/Vehicle.js';
import mongoose from 'mongoose';

/**
 * @desc    Get all vehicles with optional filtering, searching, and sorting
 * @route   GET /api/vehicles
 * @access  Public
 */
export const getVehicles = async (req, res) => {
  try {
    const {
      search,
      brand,
      fuelType,
      transmission,
      category,
      minPrice,
      maxPrice,
      sort,
      featured,
    } = req.query;

    // Build the Mongoose query filter object
    const filter = {};

    // 1. Full-text / Partial search across brand, model, location
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { brand: searchRegex },
        { model: searchRegex },
        { location: searchRegex },
      ];
    }

    // 2. Specific brand filter
    if (brand && brand !== 'All') {
      filter.brand = new RegExp(`^${brand.trim()}$`, 'i');
    }

    // 3. Fuel type filter
    if (fuelType && fuelType !== 'All') {
      filter.fuelType = fuelType;
    }

    // 4. Transmission filter
    if (transmission && transmission !== 'All') {
      filter.transmission = transmission;
    }

    // 5. Category / Body style filter
    if (category && category !== 'All') {
      filter.category = category;
    }

    // 6. Featured filter
    if (featured === 'true') {
      filter.isFeatured = true;
    }

    // 7. Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 8. Sorting options
    let sortOption = { createdAt: -1 }; // Default: Newest listings first
    if (sort === 'price_asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price_desc') {
      sortOption = { price: -1 };
    } else if (sort === 'year_desc') {
      sortOption = { year: -1 };
    } else if (sort === 'mileage_asc') {
      sortOption = { mileage: 1 };
    }

    // Execute query
    const vehicles = await Vehicle.find(filter).sort(sortOption);

    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    console.error('Error in getVehicles:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching vehicles',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single vehicle by ID
 * @route   GET /api/vehicles/:id
 * @access  Public
 */
export const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle ID format',
      });
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
    }

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    console.error('Error in getVehicleById:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching vehicle details',
      error: error.message,
    });
  }
};

/**
 * @desc    Create a new vehicle listing
 * @route   POST /api/vehicles
 * @access  Public
 */
export const createVehicle = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      price,
      fuelType,
      transmission,
      mileage,
      location,
      image,
      description,
      engine,
      category,
      isFeatured,
      features,
    } = req.body;

    // Basic required field validations
    if (!brand || !model || !year || !price || !fuelType || !transmission || !mileage || !location || !image || !description || !engine) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required vehicle fields',
      });
    }

    const newVehicle = await Vehicle.create({
      brand: brand.trim(),
      model: model.trim(),
      year: Number(year),
      price: Number(price),
      fuelType,
      transmission,
      mileage: Number(mileage),
      location: location.trim(),
      image: image.trim(),
      description: description.trim(),
      engine: engine.trim(),
      category: category || 'Sedan',
      isFeatured: Boolean(isFeatured),
      features: Array.isArray(features) && features.length > 0 ? features : undefined,
    });

    res.status(201).json({
      success: true,
      message: 'Vehicle listed successfully!',
      data: newVehicle,
    });
  } catch (error) {
    console.error('Error in createVehicle:', error.message);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while creating vehicle listing',
      error: error.message,
    });
  }
};

/**
 * @desc    Update an existing vehicle listing
 * @route   PUT /api/vehicles/:id
 * @access  Public
 */
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle ID format',
      });
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true, // Return modified document
        runValidators: true, // Run schema validators
      }
    );

    if (!updatedVehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found to update',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vehicle updated successfully!',
      data: updatedVehicle,
    });
  } catch (error) {
    console.error('Error in updateVehicle:', error.message);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating vehicle',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a vehicle listing
 * @route   DELETE /api/vehicles/:id
 * @access  Public
 */
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle ID format',
      });
    }

    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found to delete',
      });
    }

    res.status(200).json({
      success: true,
      message: `${vehicle.brand} ${vehicle.model} was successfully deleted.`,
    });
  } catch (error) {
    console.error('Error in deleteVehicle:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting vehicle',
      error: error.message,
    });
  }
};

/**
 * @desc    Get aggregate stats for dashboard / homepage
 * @route   GET /api/vehicles/stats/summary
 * @access  Public
 */
export const getVehicleStats = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const distinctBrands = await Vehicle.distinct('brand');
    const featuredCount = await Vehicle.countDocuments({ isFeatured: true });

    // Calculate average price
    const avgPriceAgg = await Vehicle.aggregate([
      { $group: { _id: null, avgPrice: { $avg: '$price' }, minPrice: { $min: '$price' }, maxPrice: { $max: '$price' } } },
    ]);

    const stats = {
      totalVehicles,
      totalBrands: distinctBrands.length,
      brandsList: distinctBrands,
      featuredCount,
      avgPrice: avgPriceAgg.length > 0 ? Math.round(avgPriceAgg[0].avgPrice) : 0,
      minPrice: avgPriceAgg.length > 0 ? avgPriceAgg[0].minPrice : 0,
      maxPrice: avgPriceAgg.length > 0 ? avgPriceAgg[0].maxPrice : 0,
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error in getVehicleStats:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while calculating stats',
      error: error.message,
    });
  }
};
