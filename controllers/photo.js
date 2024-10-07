import Photo from "../models/photos.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import User from "../models/user.js";

export const uploadPhotos = asyncHandler(async (req, res) => {
  console.log("hit");
  //how do i upload multiple images
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }
  console.log(req.user);
  const photo = await Photo.create({
    owner: req.user,
    images: req.files.map((file) => file.path),
  });
  res.status(200).json({
    success: true,
    message: "Images uploadede successfully",
  });
});

export const getAllPhotos = asyncHandler(async (req, res) => {
  const photos = await Photo.find({});
  if (!photos) {
    return res.status(400).json({
      success: false,
      message: "No photos found",
    });
  }
  return res.status(201).json({
    success: true,
    message: "Photos fetched successfully",
    photos,
  });
});
