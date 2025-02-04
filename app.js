import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/databse.js";
import cors from "cors";
// connect to server
const app = express();

// activate middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(PORT, () => {
      console.log("server is listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });
