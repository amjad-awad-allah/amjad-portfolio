import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbUri = import.meta.env.VITE_MONGODB_URI;
    if (!dbUri) {
      throw new Error('VITE_MONGODB_URI is not defined in .env file');
    }

    await mongoose.connect(dbUri);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;