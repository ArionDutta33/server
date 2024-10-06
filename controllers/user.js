import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/picStockDB")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

export const regsiterUser = asyncHandler(async (req, res) => {
  let profilePic = req.file ? req.file.path : null;
  console.log(req.file);
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const userProfilePic =
    profilePic ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400).json({ success: false, message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await new User({
    name: name,
    email,
    password: hashedPassword,
    profilePic: userProfilePic,
  });
  await user.save();
  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email: email });
  if (!isUser) {
    return res.status(400).json({ success: false, message: "User not found" });
  }
  const isPasswordMatch = await bcrypt.compare(password, isUser.password);
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { userId: isUser._id, name: isUser.name, email: isUser.email },
    "secret",
    {
      expiresIn: "1h",
    }
  );
  const options = {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  };
  return res
    .status(200)
    .cookie("token", token, options)
    .json({ success: true, message: "User logged in successfully" });
});
