import mongoose from 'mongoose'; // importing mongoose library

const connectDB = async () => {// Define the connection 
  try {// handle connection error
    const conn = await mongoose.connect(process.env.MONGODB_URI);// Attempt conncetion
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
