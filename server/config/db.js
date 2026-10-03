import mongoose from 'mongoose';

/**
 * Connects to MongoDB database using Mongoose.
 * Uses environment variable MONGO_URI or defaults to local MongoDB.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/autodekho');
    console.log(` MongoDB Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
