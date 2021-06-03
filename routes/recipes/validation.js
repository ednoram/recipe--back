const { body } = require("express-validator");

exports.postRules = [
  body("title").trim(),
  body("summary").trim(),
  body("token").exists().withMessage("Token is required"),
  body("title").isLength({ min: 1 }).withMessage("Title is required"),
];

exports.putRules = [
  body("title").trim(),
  body("summary").trim(),
  body("token").exists().withMessage("Token is required"),
  body("title").isLength({ min: 1 }).withMessage("Title is required"),
];

exports.deleteRules = [body("token").exists().withMessage("Token is required")];
