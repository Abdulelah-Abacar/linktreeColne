import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }
    return await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
