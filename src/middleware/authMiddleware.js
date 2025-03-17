import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  try {
    // 1.get token
    const token = req.headers["authorization"]?.split(" ")[1];

    // 2.verify token
    jwt.verify(token, SECRET_KEY, (err, decode) => {
      if (err) {
        console.error("JWT Verify Error:", err.message);

        return res.status(401).json({ message: "auth failed" });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    res.status(500).json({ message: "auth failed" });
  }
};

export default authMiddleware;
