import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if (process.env.NODE_ENV === 'development') {
            console.log("✅ MongoDB connected successfully:", conn.connection.host);
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("❌ MongoDB connection failed:", error.message);
        }
        process.exit(1);
    }
}