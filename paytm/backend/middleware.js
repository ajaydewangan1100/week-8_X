import { JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ success: false });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    if (decoded.userID) {
      req.userId = decoded.userID;
      next();
    } else {
      return res.status(403).json({ success: false });
    }
  } catch (err) {
    return res.status(403).json({ success: false });
  }
};

export { authMiddleware };
