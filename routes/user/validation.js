const { body } = require("express-validator");

const tokenRule = body("token").exists().withMessage("Token is required");
const nameRule = body("name")
  .isLength({ min: 1, max: 25 })
  .withMessage("Name must contain 1-25 characters");

exports.registerRules = [
  nameRule,
  body("email")
    .isEmail()
    .withMessage("Email address does not exist or is not valid"),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must contain 8-16 characters"),
  body("passwordConfirmation")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

exports.loginRules = [
  body("email")
    .isEmail()
    .withMessage("Email address does not exist or is not valid"),
  body("password").isString().withMessage("Password is required"),
];

exports.deleteRules = [
  body("password").isString().withMessage("Password is required"),
];

exports.loginWithTokenRules = [tokenRule];

exports.patchRules = [tokenRule, nameRule];

exports.changePasswordRules = [
  tokenRule,
  body("newPassword")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must contain 8-16 characters"),
];

exports.favoriteRecipeRules = [
  tokenRule,
  body("recipeId").isString().withMessage("Recipe ID is required"),
];
