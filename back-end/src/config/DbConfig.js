import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
async function Connection() {
  try {
    const connected = await mongoose.connect(process.env.DB_URL);
    if (connected) {
      console.log("connected to mongodb");
    }
  } catch (error) {
    console.log("error", error);
  }
}

export default Connection;
