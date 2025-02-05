import express from "express";
import register from "../controller/register.js";
import login from "../controller/login.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
