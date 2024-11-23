import mongoose from "mongoose";

// MongoDB connection function
const DbCon = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      // In Mongoose 6+, these options are no longer required
      // They were needed in older versions but are now the default behavior
    });

    console.log("MongoDB is connected");
  } catch (error) {
    // Log detailed error message
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default DbCon;
