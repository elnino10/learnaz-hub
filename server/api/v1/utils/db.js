import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB = process.env.DB_URI.replace("<PASSWORD>", process.env.DB_PASSWORD);

class DBClient {
  constructor() {
    this.connectDB();
  }

  async connectDB() {
    try {
      await mongoose.connect(DB);
      console.log("Database connected successfully!!!");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }
}

const dbClient = new DBClient();

export default dbClient;
