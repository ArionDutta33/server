import express from "express";
import Photo from "../models/photos.js";
import multer from "multer";
const { Router } = express;
import upload from "../middleware/upload.js";
import { getAllPhotos, uploadPhotos } from "../controllers/photo.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = Router();
router.post("/upload", isAuthenticated, upload.array("photos"), uploadPhotos);
router.get("/all", getAllPhotos);
export default router;
