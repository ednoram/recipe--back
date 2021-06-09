const multer = require("multer");

const { diskStorage } = multer;

const storage = diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads");
  },
  filename: (_req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "--" +
        new Date().toISOString().replace(/:/g, "-") +
        "--" +
        file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = ["image/jpeg", "image/png"];

  if (fileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = upload;
