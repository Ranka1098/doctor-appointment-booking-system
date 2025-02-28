import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import getAllnotifocation from "../controller/getAllnotification.js";
import deleteAllNotifications from "../controller/deleteAllNotifications.js";
const notificationRouter = express.Router();

notificationRouter.post(
  "/get-All-notification",
  authMiddleware,
  getAllnotifocation
);

notificationRouter.post(
  "/delete-All-notification",
  authMiddleware,
  deleteAllNotifications
);

export default notificationRouter;
