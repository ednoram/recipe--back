const { Router } = require("express");

const { upload } = require("@middleware");
const { uploadImage } = require("@controllers/uploads");

const router = Router();

router.post("/", upload.single("image"), uploadImage);

module.exports = router;
