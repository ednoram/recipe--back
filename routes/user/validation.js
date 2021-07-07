const { body, query } = require("express-validator");

const bodyNameRule = body("name")
  .isLength({ min: 1, max: 25 })
  .withMessage("Name must contain 1-25 characters");
const bodyTokenRule = body("token").exists().withMessage("Token is required");

exports.registerRules = [
  bodyNameRule,
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

exports.loginWithTokenRules = [bodyTokenRule];

exports.patchRules = [bodyTokenRule, bodyNameRule];

exports.verifyUserRules = [
  query("token").exists().withMessage("Token is required."),
];

exports.changePasswordRules = [
  bodyTokenRule,
  body("newPassword")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must contain 8-16 characters"),
];

exports.favoriteRecipeRules = [
  bodyTokenRule,
  body("recipeId").isString().withMessage("Recipe ID is required"),
];

exports.sendEmailRules = [
  body("email").isEmail().withMessage("Email is required"),
];

exports.resetPasswordRules = [
  body("newPassword")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must contain 8-16 characters"),
];
