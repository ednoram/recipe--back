const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (_req, file, cb) => {
    const fileTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (fileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = upload;
