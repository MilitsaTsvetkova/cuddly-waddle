import mongoose from "mongoose";
let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in .env file");
  }

  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  try {
    console.log("=> using new database connection");
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devoverflow",
    });
    console.log("Database connected successfully");
    isConnected = true;
  } catch (e) {
    console.log("Error in connecting to database", e);
  }
};
