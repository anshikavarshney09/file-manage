const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer + Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "drive_files",
    resource_type: "auto",            // 👈 auto = images + pdf + docx + zip sab allowed
    format: async (req, file) => undefined, // cloudinary auto-detect
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };

