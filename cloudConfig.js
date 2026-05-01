const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const hasCloudinaryConfig = Boolean(
  process.env.CLOUD_NAME &&
  process.env.CLOUD_API_KEY &&
  process.env.CLOUD_API_SECRET
);

const uploadDir = path.join(__dirname, 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = hasCloudinaryConfig
  ? new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'wanderlust_DEV',
        allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
      },
    })
  : multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadDir),
      filename: (req, file, cb) => {
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
        cb(null, `${Date.now()}-${safeName}`);
      },
    });

module.exports = {
  cloudinary,
  storage,
  hasCloudinaryConfig,
};
