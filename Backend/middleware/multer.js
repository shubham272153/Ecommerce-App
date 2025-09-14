import multer from "multer";

// Disk Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/"); // Ensure the 'uploads/' folder exists
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname); // Save with the original file name
  },
});

// Optional: File filter to allow only images
const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);
  } else {
    callback(new Error("Invalid file type! Only images are allowed."), false);
  }
};

// Set up the multer upload
const upload = multer({
  storage,
  fileFilter, // Add file filtering
});

export default upload;
