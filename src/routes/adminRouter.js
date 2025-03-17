import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import getAllUser from "../controller/getAllUser.js";
import getAllDoctor from "../controller/getAllDoctor.js";

const adminRouter = express.Router();

// user ko get kaernge
adminRouter.get("/get-All-user", authMiddleware, getAllUser);

// all doctor ko het karenge
adminRouter.get("/get-All-doctor", authMiddleware, getAllDoctor);

export default adminRouter;
