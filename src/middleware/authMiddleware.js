import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // token ko request headers se lena
    const token = req.headers["authorization"]?.split(" ")[1];
    // check token
    if (!token) {
      return res.status(404).json({ message: "token not found" });
    }
    // token ko verify karo
    const decoded = jwt.verify(token, SECRET_KEY);
    // token sahi to user id ke saath jod do
    req.userId = decoded.id;
    // allow next api call
    next();
  } catch (error) {
    res.status(500).json({ message: "auth failed" });
  }
};

export default authMiddleware;
