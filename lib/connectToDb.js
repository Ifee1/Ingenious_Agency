import mongoose from "mongoose";
// require("dotenv").config();

const connection = {
  isConnected: false,
  db: null,
};
mongoose.set("debug", true);

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      // console.log("Already connected to the database");
      // console.log(connection.db);
      return connection.db;
    }

    // Establish a new connection
    connection.db = await mongoose.connect(process.env.MONGO_KEY, {});

    connection.isConnected = true;
    // console.log("Database connection established");
    return connection.db;
  } catch (error) {
    console.error("Error connecting to database:", error);
    return null;
  }
};
