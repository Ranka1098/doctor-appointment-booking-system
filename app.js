import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/databse.js";
import cors from "cors";
import authRouter from "./src/routes/auth.js";
import doctorRouter from "./src/routes/doctorRouter.js";
import notificationRouter from "./src/routes/notificationRouter.js";
// connect to server
const app = express();

// activate middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

// -----------------------routes-----------------------------
app.use("/", authRouter);
app.use("/", doctorRouter);
app.use("/", notificationRouter);

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
