import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, "secret");
  if (!decoded) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const user = await User.findById(decoded.userId);
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  req.user = user;

  next();
};
