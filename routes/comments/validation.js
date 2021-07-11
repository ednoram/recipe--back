const { body } = require("express-validator");

const messageRule = body("message")
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage("Message must exist and must be 1-1000 characters long");

exports.postRules = [
  messageRule,
  body("token").exists().withMessage("Token is required"),
  body("recipeId").exists().withMessage("Recipe ID is required"),
];

exports.patchRules = [
  messageRule,
  body("token").exists().withMessage("Token is required"),
];

exports.deleteRules = [body("token").exists().withMessage("Token is required")];