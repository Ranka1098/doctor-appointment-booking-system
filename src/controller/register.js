import userModel from "../models/user.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    // 1.take input from user
    const { name, email, password } = req.body;
    //   2.chaeck input feilds are empty or not
    if (!name || !email || !password) {
      return res.status(400).json({ message: "plss fill all filed" });
    }
    //   check user all ready exist or not
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ messeage: "user all ready exists" });
    }

    // password ko hash kare
    const hashPassword = await bcrypt.hash(password, 10);

    //    new user database  create
    const newUser = new userModel({ name, email, password: hashPassword });
    //   nuew user save in database
    await newUser.save();
    //   response success message
    res.status(201).json({ message: "new user created", newUser });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};

export default register;
