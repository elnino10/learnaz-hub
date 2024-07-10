import mongoose from "mongoose";
import "dotenv/config";

const host = process.env.DB_HOST || "127.0.0.1";
const port = process.env.DB_PORT || 27017;
const database = process.env.APP_DATABASE || "learnaz_hub";

const url = `mongodb://${host}:${port}/${database}`;

class DBClient {
  constructor() {
    this.connectDB();
  }

  async connectDB() {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }
}

const dbClient = new DBClient();

export default dbClient;
