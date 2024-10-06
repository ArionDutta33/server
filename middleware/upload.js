import multer from "multer";
import path from "path";
// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp"); // Specify the directory for saving files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Rename the file to avoid conflicts
  },
});

// Initialize Multer
const upload = multer({ storage: storage });
export default upload;
