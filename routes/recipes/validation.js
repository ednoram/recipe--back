const { body } = require("express-validator");

exports.postRules = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage("Title is required"),
  body("summary").trim(),
];

exports.patchRules = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage("Title is required"),
  body("summary").trim(),
];
