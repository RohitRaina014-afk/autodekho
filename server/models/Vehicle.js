import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required (e.g., BMW, Audi, Toyota)'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model name is required (e.g., 3 Series, Fortuner)'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Manufacturing year is required'],
      min: [1990, 'Year must be 1990 or newer'],
      max: [new Date().getFullYear() + 1, 'Year cannot be in the distant future'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    fuelType: {
      type: String,
      required: [true, 'Fuel type is required'],
      enum: {
        values: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        message: '{VALUE} is not a supported fuel type',
      },
      trim: true,
    },
    transmission: {
      type: String,
      required: [true, 'Transmission type is required'],
      enum: {
        values: ['Automatic', 'Manual'],
        message: '{VALUE} is not a supported transmission',
      },
      trim: true,
    },
    mileage: {
      type: Number,
      required: [true, 'Mileage is required (in km)'],
      min: [0, 'Mileage cannot be negative'],
    },
    location: {
      type: String,
      required: [true, 'Location/City is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Primary vehicle image URL is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Vehicle description is required'],
      trim: true,
    },
    engine: {
      type: String,
      required: [true, 'Engine specification is required (e.g., 2.0L Turbo Inline-4)'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric', 'Coupe'],
      default: 'Sedan',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    features: {
      type: [String],
      default: ['Air Conditioning', 'Power Steering', 'ABS & Airbags', 'Touchscreen Infotainment', 'Bluetooth Connectivity'],
    },
  },
  {
    timestamps: true, // Automatically provides createdAt and updatedAt
  }
);

// Add index on brand, model, location for fast searching
vehicleSchema.index({ brand: 'text', model: 'text', location: 'text' });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
