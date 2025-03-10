import express from "express";
import register from "../controller/register.js";
import login from "../controller/login.js";
import authMiddleware from "../middleware/authMiddleware.js";
import getuser from "../controller/getuser.js";
import logout from "../controller/logout.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/getuser", authMiddleware, getuser);
authRouter.get("/logout", logout);

export default authRouter;
