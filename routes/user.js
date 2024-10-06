import express from "express";
import User from "../models/user.js";
import { loginUser, regsiterUser } from "../controllers/user.js";
import multer from "multer";
const { Router } = express;
import upload from "../middleware/upload.js";
const router = Router();

router.post("/register", upload.single("profilePic"), regsiterUser);
router.post("/login", loginUser);
export default router;
