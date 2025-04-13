import mongoose from 'mongoose';
import Logger from '../utils/logger'; // Import your logger

const connectDB = async (): Promise<void> => {
  const dbUri = process.env.MONGODB_URI;
  if (!dbUri) {
    Logger.error(
      'MONGODB_URI is not defined in environment variables. Database connection failed.'
    );
    process.exit(1); // Exit if connection string is missing
  }

  try {
    // Add options for newer Mongoose versions if needed, though defaults are usually fine
    await mongoose.connect(dbUri);
    Logger.info('MongoDB Connected successfully.');

    // Optional: Add listeners for connection events
    mongoose.connection.on('error', (err) => {
      Logger.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      Logger.warn('MongoDB disconnected.');
    });
  } catch (err: any) {
    Logger.error(`Could not connect to MongoDB: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
