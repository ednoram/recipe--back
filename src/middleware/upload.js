const path = require("path");
const multer = require("multer");

const { diskStorage } = multer;

const storage = diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (_req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "--" +
        new Date().toISOString().replace(/:/g, "-") +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (_req, file, cb) => {
  const fileTypes = ["image/png", "image/jpeg", "image/jpg"];

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