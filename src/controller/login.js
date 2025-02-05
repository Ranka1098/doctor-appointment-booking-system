import userModel from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const SECRATE_KEY = process.env.SECRATE_KEY;

    // take input from user
    const { email, password } = req.body;

    //   /check input fileds are wmpty or not
    if (!email || !password) {
      return res.status(400).json({ message: "plss gives valid infromation" });
    }

    //   find user in database
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "user not found" });
    }

    // match password
    const passwordMatched = await bcrypt.compare(password, userExist.password);
    if (!passwordMatched) {
      return res.status(404).json({ message: "password is not matched" });
    }
    // create token
    const token = jwt.sign({ id: userExist._id }, SECRATE_KEY, {
      expiresIn: "7d",
    });
    // token ko cookie me set kare
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // success responce message
    res.status(200).json({ message: "user logged in successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export default login;
