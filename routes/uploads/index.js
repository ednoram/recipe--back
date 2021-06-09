const express = require("express");

const { upload } = require("../../middleware");
const { uploadImage } = require("../../controllers/uploads");

const { Router } = express;
const router = Router();

router.use("/", express.static("uploads"));

router.post("/", upload.single("image"), uploadImage);

module.exports = router;
