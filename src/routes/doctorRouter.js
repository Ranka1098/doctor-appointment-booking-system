import express from "express";
import applyDoctor from "../controller/applyDoctor.js";
import authMiddleware from "../middleware/authMiddleware.js";

const doctorRouter = express.Router();

doctorRouter.post("/apply-doctor", authMiddleware, applyDoctor);

export default doctorRouter;
