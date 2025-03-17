import express from "express";
import applyDoctor from "../controller/applyDoctor.js";
import authMiddleware from "../middleware/authMiddleware.js";
import changeAccountStatus from "../controller/changeAccountStatus.js";
import getDoctorInfo from "../controller/getDoctorInfo.js";
import updateDoctorDetail from "../controller/updateDoctorDetail.js";

const doctorRouter = express.Router();

doctorRouter.post("/apply-doctor", authMiddleware, applyDoctor);
doctorRouter.post(
  "/change-account-status",
  authMiddleware,
  changeAccountStatus
);
doctorRouter.get("/getDoctorDetail/:id", authMiddleware, getDoctorInfo);
doctorRouter.post(
  "/updateDoctorDetail/:id",
  authMiddleware,
  updateDoctorDetail
);

export default doctorRouter;
