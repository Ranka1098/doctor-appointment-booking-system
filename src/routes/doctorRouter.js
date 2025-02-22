import express from "express";
import applyDoctor from "../controller/applyDoctor.js";

const doctorRouter = express.Router();

doctorRouter.post("/apply-doctor", applyDoctor);

export default doctorRouter;
