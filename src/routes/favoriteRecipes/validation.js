const { body } = require("express-validator");

exports.postValidation = [
  body("recipeId").exists().withMessage("Recipe ID is required"),
];
